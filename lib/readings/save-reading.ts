import {
  castLines,
  getChangingLines,
  getPrimaryHexagram,
  getTransformedHexagram,
  serializeChangingLines,
  serializeLineValues,
} from "@/lib/iching";
import { getHexagram } from "@/lib/hexagrams";
import {
  generateInterpretation,
  INTERPRETATION_UNAVAILABLE_MESSAGE,
  type InterpretationInput,
} from "@/lib/openai";
import {
  getFreeInterpretationPlaceholder,
  hasPremiumAccess,
} from "@/lib/premium";
import { normalizeLanguageCode } from "@/lib/i18n/languages";
import { prisma } from "@/lib/prisma";

function toHexagramTitle(hexagram: ReturnType<typeof getHexagram>): string {
  return `${hexagram.chineseName} · ${hexagram.title}`;
}

/** Cast coins, interpret, and persist a new reading (always saves, even if AI fails). */
export async function saveReadingForUser(userId: string, question: string) {
  const trimmed = question.trim();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { premiumUntil: true, preferredLanguage: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const language = normalizeLanguageCode(user.preferredLanguage);
  const isPremium = hasPremiumAccess(user.premiumUntil);

  console.log("[readings] Premium user:", isPremium);

  const lineValues = castLines();
  const hexagramNumber = getPrimaryHexagram(lineValues);
  const changingLinePositions = getChangingLines(lineValues);
  const transformedHexagramNumber = getTransformedHexagram(lineValues);

  const primary = getHexagram(hexagramNumber);
  const transformed = transformedHexagramNumber
    ? getHexagram(transformedHexagramNumber)
    : null;

  let interpretation: string;
  let interpretationPending = false;
  let isPremiumReading = false;

  if (isPremium) {
    const interpretationInput: InterpretationInput = {
      question: trimmed,
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
      changingLines: changingLinePositions,
    };

    try {
      const result = await generateInterpretation(interpretationInput);
      interpretation = result.text;
      interpretationPending = result.pending;
      isPremiumReading = !result.pending;
    } catch (error) {
      console.error("[readings] AI interpretation failed", error);
      interpretation = INTERPRETATION_UNAVAILABLE_MESSAGE;
      interpretationPending = true;
      isPremiumReading = false;
    }
  } else {
    console.log("[readings] Skipping AI generation for non-premium user.");
    interpretation = getFreeInterpretationPlaceholder(language);
    interpretationPending = false;
    isPremiumReading = false;
  }

  return prisma.reading.create({
    data: {
      userId,
      question: trimmed,
      hexagram: hexagramNumber,
      primaryHexagramName: primary.title,
      lineValues: serializeLineValues(lineValues),
      changingLines: serializeChangingLines(changingLinePositions),
      transformedHexagram: transformedHexagramNumber,
      finalHexagramName: transformed?.title ?? null,
      interpretation,
      interpretationPending,
      isPremiumReading,
      language,
    },
  });
}
