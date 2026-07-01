import { ptBR, type Messages } from "@/messages/pt-BR";
import { en } from "@/messages/en";
import { es } from "@/messages/es";

export const LOCALES = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt-BR";
export const LOCALE_COOKIE = "site-locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  "pt-BR": "PT",
  en: "EN",
  es: "ES",
};

const catalogs: Record<Locale, Messages> = {
  "pt-BR": ptBR,
  en,
  es,
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
}

export function translate(
  messages: Messages,
  key: string,
  params?: Record<string, string>,
): string {
  const parts = key.split(".");
  let value: unknown = messages;
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  if (typeof value !== "string") return key;
  if (!params) return value;
  return Object.entries(params).reduce(
    (text, [param, replacement]) => text.replaceAll(`{${param}}`, replacement),
    value,
  );
}
