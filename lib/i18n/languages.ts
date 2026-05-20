export const SUPPORTED_LANGUAGES = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "zh-CN", label: "简体中文" },
] as const;

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(
  (lang) => lang.code,
);

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: SupportedLanguageCode = "de";

export const LANGUAGE_INSTRUCTIONS: Record<SupportedLanguageCode, string> = {
  de: "Bitte verfassen Sie die gesamte Interpretation auf Deutsch.",
  en: "Write the entire interpretation in English.",
  "zh-CN": "请用简体中文完整回答。",
};

export const LANGUAGE_LOCALES: Record<SupportedLanguageCode, string> = {
  de: "de-DE",
  en: "en-US",
  "zh-CN": "zh-CN",
};

const REMOVED_LANGUAGE_CODES = new Set([
  "zh-TW",
  "zh-Hant",
  "ja",
  "ja-JP",
]);

export function isSupportedLanguageCode(
  code: string,
): code is SupportedLanguageCode {
  return (SUPPORTED_LANGUAGE_CODES as readonly string[]).includes(code);
}

/** Normalize stored or incoming language codes; unsupported values fall back to German. */
export function normalizeLanguageCode(
  code: string | null | undefined,
): SupportedLanguageCode {
  if (!code) {
    return DEFAULT_LANGUAGE;
  }

  const trimmed = code.trim();
  if (isSupportedLanguageCode(trimmed)) {
    return trimmed;
  }

  if (REMOVED_LANGUAGE_CODES.has(trimmed)) {
    return DEFAULT_LANGUAGE;
  }

  return DEFAULT_LANGUAGE;
}

export function localeForLanguage(code: SupportedLanguageCode): string {
  return LANGUAGE_LOCALES[code];
}
