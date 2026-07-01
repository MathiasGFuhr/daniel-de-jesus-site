import type { NavIconName } from "@/components/Icons";
import type { Locale } from "@/lib/i18n-shared";
import { translate } from "@/lib/i18n-shared";
import type { Messages } from "@/messages/pt-BR";

export interface PublicNavItem {
  label: string;
  href: string;
  icon: NavIconName;
}

export const PUBLIC_NAV_CONFIG: { key: string; href: string; icon: NavIconName }[] = [
  { key: "nav.home", href: "", icon: "home" },
  { key: "nav.about", href: "/sobre", icon: "about" },
  { key: "nav.music", href: "/musicas", icon: "music" },
  { key: "nav.videos", href: "/videos", icon: "video" },
  { key: "nav.spotify", href: "/spotify", icon: "spotify" },
  { key: "nav.store", href: "/loja", icon: "store" },
  { key: "nav.links", href: "/links", icon: "link" },
  { key: "nav.contact", href: "/contato", icon: "contact" },
];

/** @deprecated Use buildPublicNav(messages) via ShellData.nav */
export const PUBLIC_NAV: PublicNavItem[] = PUBLIC_NAV_CONFIG.map((item) => ({
  label: item.key,
  href: item.href,
  icon: item.icon,
}));

export function buildPublicNav(messages: Messages): PublicNavItem[] {
  return PUBLIC_NAV_CONFIG.map((item) => ({
    label: translate(messages, item.key),
    href: item.href,
    icon: item.icon,
  }));
}

/** Resolve um href relativo do site para o caminho público completo. */
export function navHref(basePath: string, href: string): string {
  return href ? `${basePath}${href}` : basePath;
}

/**
 * Resolve uma URL salva pelo usuário. URLs externas (http, mailto, #) ficam
 * como estão; URLs internas (começando com "/") recebem o prefixo do site.
 */
export function resolvePublicHref(basePath: string, url: string): string {
  if (!url) return basePath;
  if (/^https?:\/\//.test(url) || url.startsWith("mailto:") || url.startsWith("#")) {
    return url;
  }
  if (url.startsWith("/")) return `${basePath}${url}`;
  return url;
}

export interface ShellSocial {
  label: string;
  url: string;
  icon: string;
  handle: string;
}

export interface ShellData {
  basePath: string;
  slug: string;
  locale: Locale;
  nav: PublicNavItem[];
  artistName: string;
  artistLabel: string;
  socials: ShellSocial[];
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  footer: {
    text: string;
    email: string;
    copyright: string;
    rights: string;
    crafted: string;
  };
}
