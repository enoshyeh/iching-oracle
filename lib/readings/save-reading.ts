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
import { prisma } from "@/lib/prisma";
import { getPreferredLanguageForUser } from "@/lib/user/preferred-language";

function toHexagramTitle(hexagram: ReturnType<typeof getHexagram>): string {
  return `${hexagram.chineseName} · ${hexagram.title}`;
}

/** Cast coins, interpret, and persist a new reading (always saves, even if AI fails). */
export async function saveReadingForUser(userId: string, question: string) {
  const trimmed = question.trim();
  const language = await getPreferredLanguageForUser(userId);
  const lineValues = castLines();
  const hexagramNumber = getPrimaryHexagram(lineValues);
  const changingLinePositions = getChangingLines(lineValues);
  const transformedHexagramNumber = getTransformedHexagram(lineValues);

  const primary = getHexagram(hexagramNumber);
  const transformed = transformedHexagramNumber
    ? getHexagram(transformedHexagramNumber)
    : null;

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

  let interpretation: string;
  let interpretationPending = false;

  try {
    const result = await generateInterpretation(interpretationInput);
    interpretation = result.text;
    interpretationPending = result.pending;
  } catch (error) {
    console.error("[readings] AI interpretation failed", error);
    interpretation = INTERPRETATION_UNAVAILABLE_MESSAGE;
    interpretationPending = true;
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
      language,
    },
  });
}
