"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  normalizeLanguageCode,
  type SupportedLanguageCode,
} from "@/lib/i18n/languages";
import { prisma } from "@/lib/prisma";

export type UpdateLanguageResult = {
  error?: string;
  success?: boolean;
  language?: SupportedLanguageCode;
};

export async function updatePreferredLanguage(
  language: string,
): Promise<UpdateLanguageResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be signed in to change language." };
  }

  const normalized = normalizeLanguageCode(language);

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { preferredLanguage: normalized },
    });

    revalidatePath("/", "layout");
    revalidatePath("/dashboard");
    revalidatePath("/history");
    revalidatePath("/reading", "layout");

    return { success: true, language: normalized };
  } catch (error) {
    console.error("[updatePreferredLanguage]", error);
    return { error: "Failed to update language preference." };
  }
}
