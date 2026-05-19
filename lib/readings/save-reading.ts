import {
  getHexagram,
  getRandomHexagramNumber,
} from "@/lib/hexagrams";
import { generateInterpretation } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

/** Persist a new reading: random hexagram, AI interpretation, then return record. */
export async function saveReadingForUser(userId: string, question: string) {
  const trimmed = question.trim();
  const hexagramNumber = getRandomHexagramNumber();
  const hexagram = getHexagram(hexagramNumber);

  const interpretation = await generateInterpretation(trimmed, {
    number: hexagram.number,
    title: hexagram.title,
    chineseName: hexagram.chineseName,
    judgment: hexagram.judgment,
  });

  return prisma.reading.create({
    data: {
      userId,
      question: trimmed,
      hexagram: hexagramNumber,
      changing: null,
      interpretation,
    },
  });
}
