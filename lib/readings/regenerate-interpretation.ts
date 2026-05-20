import "server-only";

import { parseChangingLines } from "@/lib/iching";
import { getHexagram } from "@/lib/hexagrams";
import { normalizeLanguageCode } from "@/lib/i18n/languages";
import { generateInterpretation } from "@/lib/openai";
import { hasPremiumAccess } from "@/lib/premium";
import { prisma } from "@/lib/prisma";
import { getPreferredLanguageForUser } from "@/lib/user/preferred-language";

function toHexagramTitle(hexagram: ReturnType<typeof getHexagram>): string {
  return `${hexagram.chineseName} · ${hexagram.title}`;
}

/** Regenerate AI interpretation for a pending or unlockable reading (premium only). */
export async function regenerateInterpretationForReading(
  userId: string,
  readingId: string,
): Promise<{ success: boolean; error?: string }> {
  const [reading, user] = await Promise.all([
    prisma.reading.findFirst({
      where: { id: readingId, userId },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { premiumUntil: true },
    }),
  ]);

  if (!reading) {
    return { success: false, error: "Reading not found." };
  }

  if (!hasPremiumAccess(user)) {
    return {
      success: false,
      error: "Premium subscription required to generate AI interpretation.",
    };
  }

  const canRegenerate =
    reading.interpretationPending || !reading.isPremiumReading;

  if (!canRegenerate) {
    return {
      success: false,
      error: "This reading already has an interpretation.",
    };
  }

  const primary = getHexagram(reading.hexagram);
  const transformed = reading.transformedHexagram
    ? getHexagram(reading.transformedHexagram)
    : null;

  const language = normalizeLanguageCode(
    reading.language ?? (await getPreferredLanguageForUser(userId)),
  );

  const result = await generateInterpretation({
    question: reading.question,
    language,
    primaryHexagram: {
      number: primary.number,
      title: toHexagramTitle(primary),
      judgment: primary.judgment,
    },
    transformedHexagram: transformed
      ? {
          number: transformed.number,
          title: toHexagramTitle(transformed),
          judgment: transformed.judgment,
        }
      : null,
    changingLines: parseChangingLines(reading.changingLines),
  });

  if (result.pending) {
    return {
      success: false,
      error: "AI interpretation is still unavailable. Please try again later.",
    };
  }

  await prisma.reading.update({
    where: { id: readingId },
    data: {
      interpretation: result.text,
      interpretationPending: false,
      isPremiumReading: true,
    },
  });

  return { success: true };
}
