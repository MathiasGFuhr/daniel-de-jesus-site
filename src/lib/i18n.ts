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
import { getSiteBySlug, getSiteSettings } from "@/lib/data";

export * from "@/lib/i18n-shared";

export async function getPublicLocale(siteDefault?: Locale): Promise<Locale> {
  const cookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  if (siteDefault && isLocale(siteDefault)) return siteDefault;
  return DEFAULT_LOCALE;
}

async function resolveSiteDefault(slug?: string): Promise<Locale | undefined> {
  if (!slug) return undefined;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) return undefined;
  const site = await getSiteSettings(tenant.id);
  return isLocale(site.defaultLocale) ? site.defaultLocale : undefined;
}

export async function getPublicI18n(slug?: string) {
  const siteDefault = await resolveSiteDefault(slug);
  const locale = await getPublicLocale(siteDefault);
  const messages = getMessages(locale);
  const t = (key: string, params?: Record<string, string>) =>
    translate(messages, key, params);
  return { locale, messages, t };
}
