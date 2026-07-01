import "server-only";
import {
  getMessages,
  translate,
  isLocale,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n-shared";
import { getSiteBySlug, getSiteSettings } from "@/lib/data";

export * from "@/lib/i18n-shared";

async function resolveSiteLocale(slug?: string): Promise<Locale> {
  if (!slug) return DEFAULT_LOCALE;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) return DEFAULT_LOCALE;
  const site = await getSiteSettings(tenant.id);
  return isLocale(site.defaultLocale) ? site.defaultLocale : DEFAULT_LOCALE;
}

export async function getPublicI18n(slug?: string) {
  const locale = await resolveSiteLocale(slug);
  const messages = getMessages(locale);
  const t = (key: string, params?: Record<string, string>) =>
    translate(messages, key, params);
  return { locale, messages, t };
}
