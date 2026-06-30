import type { NavIconName } from "@/components/Icons";

export interface PublicNavItem {
  label: string;
  href: string;
  icon: NavIconName;
}

// Navegação do site público. `href` é relativo ao site do cantor (basePath).
export const PUBLIC_NAV: PublicNavItem[] = [
  { label: "Início", href: "", icon: "home" },
  { label: "Sobre", href: "/sobre", icon: "about" },
  { label: "Músicas", href: "/musicas", icon: "music" },
  { label: "Vídeos", href: "/videos", icon: "video" },
  { label: "Spotify", href: "/spotify", icon: "spotify" },
  { label: "Loja", href: "/loja", icon: "store" },
  { label: "Links", href: "/links", icon: "link" },
  { label: "Contato", href: "/contato", icon: "contact" },
];

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
  };
}
