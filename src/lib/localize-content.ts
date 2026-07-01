import { defaultHome, defaultSiteSettings } from "@/lib/defaults";
import type { Locale } from "@/lib/i18n-shared";

type Translator = (key: string, params?: Record<string, string>) => string;

function sameText(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function pickLocalized(
  value: string,
  defaultPt: string,
  translated: string,
  locale: Locale,
): string {
  if (locale === "pt-BR") return value;
  const trimmed = value.trim();
  if (!trimmed || sameText(trimmed, defaultPt)) return translated;
  return value;
}

export function localizeArtistLabel(
  label: string,
  t: Translator,
  locale: Locale,
): string {
  return pickLocalized(
    label,
    defaultSiteSettings.artistLabel,
    t("hero.eyebrow"),
    locale,
  );
}

export function localizeHome<
  T extends {
    eyebrow: string;
    slogan: string;
    description: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
    thirdButtonLabel: string;
  },
>(home: T, t: Translator, locale: Locale): T {
  if (locale === "pt-BR") return home;
  return {
    ...home,
    eyebrow: pickLocalized(home.eyebrow, defaultHome.eyebrow, t("hero.eyebrow"), locale),
    slogan: pickLocalized(home.slogan, defaultHome.slogan, t("hero.slogan"), locale),
    description: pickLocalized(
      home.description,
      defaultHome.description,
      t("hero.description"),
      locale,
    ),
    primaryButtonLabel: pickLocalized(
      home.primaryButtonLabel,
      defaultHome.primaryButtonLabel,
      t("hero.primaryButton"),
      locale,
    ),
    secondaryButtonLabel: pickLocalized(
      home.secondaryButtonLabel,
      defaultHome.secondaryButtonLabel,
      t("hero.secondaryButton"),
      locale,
    ),
    thirdButtonLabel: pickLocalized(
      home.thirdButtonLabel,
      defaultHome.thirdButtonLabel,
      t("hero.thirdButton"),
      locale,
    ),
  };
}
