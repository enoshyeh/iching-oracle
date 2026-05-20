"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updatePreferredLanguage } from "@/lib/actions/language";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguageCode,
} from "@/lib/i18n/languages";

type LanguageSelectorProps = {
  currentLanguage: SupportedLanguageCode;
  className?: string;
};

export function LanguageSelector({
  currentLanguage,
  className = "",
}: LanguageSelectorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLanguage = event.target.value as SupportedLanguageCode;

    startTransition(async () => {
      const result = await updatePreferredLanguage(nextLanguage);
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <span className="sr-only">Language</span>
      <select
        name="language"
        value={currentLanguage}
        onChange={handleChange}
        disabled={isPending}
        aria-label="Language"
        className="rounded-full border border-white/10 bg-zen-surface/60 px-2.5 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-amber-gold/40 focus:border-amber-gold/50 focus:outline-none focus:ring-1 focus:ring-amber-gold/40 disabled:opacity-60"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}
