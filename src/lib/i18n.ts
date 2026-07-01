import "server-only";
import { cookies } from "next/headers";
import {
  getMessages,
  translate,
  isLocale,
  LOCALE_COOKIE,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n-shared";

export * from "@/lib/i18n-shared";

export async function getPublicLocale(): Promise<Locale> {
  const cookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return DEFAULT_LOCALE;
}

export async function getPublicI18n() {
  const locale = await getPublicLocale();
  const messages = getMessages(locale);
  const t = (key: string, params?: Record<string, string>) =>
    translate(messages, key, params);
  return { locale, messages, t };
}
