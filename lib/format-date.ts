import {
  DEFAULT_LANGUAGE,
  localeForLanguage,
  normalizeLanguageCode,
  type SupportedLanguageCode,
} from "@/lib/i18n/languages";

export function formatDate(date: Date, locale = "de-DE"): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(date: Date, locale = "de-DE"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function formatDateForLanguage(
  date: Date,
  language: string | null | undefined,
): string {
  return formatDate(date, localeForLanguage(resolveLanguage(language)));
}

export function formatDateTimeForLanguage(
  date: Date,
  language: string | null | undefined,
): string {
  return formatDateTime(date, localeForLanguage(resolveLanguage(language)));
}

function resolveLanguage(language: string | null | undefined): SupportedLanguageCode {
  return normalizeLanguageCode(language ?? DEFAULT_LANGUAGE);
}
