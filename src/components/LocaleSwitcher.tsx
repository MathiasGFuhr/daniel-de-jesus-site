"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/lib/actions/locale";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n-shared";
import { usePublicI18n } from "./PublicI18nProvider";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9" />
    </svg>
  );
}

export function LocaleSwitcher({
  locale,
  slug,
  variant = "light",
}: {
  locale: Locale;
  slug: string;
  variant?: "light" | "dark";
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

  const isDark = variant === "dark";

  return (
    <label
      className={`relative inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-colors ${
        isDark
          ? "border-white/15 bg-white/5 hover:border-gold-soft/50"
          : "border-line bg-cream-50 hover:border-gold/50"
      }`}
    >
      <GlobeIcon
        className={`h-4 w-4 shrink-0 ${isDark ? "text-gold-soft" : "text-gold"}`}
      />
      <span
        className={`hidden text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline ${
          isDark ? "text-cream-100/70" : "text-warm-gray"
        }`}
      >
        {t("a11y.language")}
      </span>
      <select
        value={locale}
        disabled={pending}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("a11y.language")}
        className={`h-7 min-w-[3.25rem] cursor-pointer appearance-none bg-transparent pr-5 text-[11px] font-bold uppercase tracking-[0.12em] outline-none disabled:opacity-60 ${
          isDark ? "text-cream" : "text-ink"
        }`}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
      <svg
        className={`pointer-events-none absolute right-2 h-3 w-3 ${
          isDark ? "text-cream-100/50" : "text-warm-gray"
        }`}
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
