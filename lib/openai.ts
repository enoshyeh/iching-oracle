import "server-only";

import OpenAI from "openai";

const MODEL = "gpt-4.1-mini";

const SYSTEM_PROMPT = `Act as a wise I Ching master.
Explain the meaning of the hexagram in relation to the user's question.
Use warm, insightful Traditional Chinese (繁體中文).
Provide practical guidance and spiritual reflection.
Limit to 3–5 paragraphs.`;

export type InterpretationHexagram = {
  number: number;
  title: string;
  chineseName: string;
  judgment: string;
};

function buildFallbackInterpretation(
  question: string,
  hexagram: InterpretationHexagram,
): string {
  return `關於您的問題：「${question}」

卦象為第 ${hexagram.number} 卦 · ${hexagram.chineseName} · ${hexagram.title}。

傳統卦辭：「${hexagram.judgment}」

請靜心體會此卦之象，以誠心照見當下之路。心誠則靈，願您在天地之道中找到安身立命的方向。`;
}

export async function generateInterpretation(
  question: string,
  hexagram: InterpretationHexagram,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return buildFallbackInterpretation(question, hexagram);
  }

  const client = new OpenAI({ apiKey });

  const userPrompt = `問題：${question}

卦象：第 ${hexagram.number} 卦 · ${hexagram.chineseName} · ${hexagram.title}
傳統卦辭：「${hexagram.judgment}」

請為問卜者提供完整的個人化解讀（繁體中文）。`;

  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 900,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (content) return content;

    return buildFallbackInterpretation(question, hexagram);
  } catch (error) {
    console.error("[openai] generateInterpretation failed", error);
    return buildFallbackInterpretation(question, hexagram);
  }
}
