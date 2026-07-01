"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/lib/actions/locale";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n-shared";
import { usePublicI18n } from "./PublicI18nProvider";

export function LocaleSwitcher({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { t } = usePublicI18n();

  function onChange(next: string) {
    if (!LOCALES.includes(next as Locale) || next === locale) return;
    startTransition(async () => {
      await setLocaleAction(next as Locale, slug);
      router.refresh();
    });
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t("a11y.language")}</span>
      <select
        value={locale}
        disabled={pending}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("a11y.language")}
        className="h-9 cursor-pointer appearance-none rounded-lg border border-line bg-cream-50 pl-2.5 pr-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink outline-none transition-colors hover:border-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-60"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-warm-gray"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </label>
  );
}
