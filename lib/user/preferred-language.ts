import "server-only";

import {
  DEFAULT_LANGUAGE,
  normalizeLanguageCode,
  type SupportedLanguageCode,
} from "@/lib/i18n/languages";
import { prisma } from "@/lib/prisma";

export async function getPreferredLanguageForUser(
  userId: string,
): Promise<SupportedLanguageCode> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferredLanguage: true },
  });

  return normalizeLanguageCode(user?.preferredLanguage ?? DEFAULT_LANGUAGE);
}
