import type { NavIconName } from "@/components/Icons";

export interface PublicNavItem {
  label: string;
  href: string;
  icon: NavIconName;
}

// Navegação do site público (rotas fixas).
export const PUBLIC_NAV: PublicNavItem[] = [
  { label: "Início", href: "/", icon: "home" },
  { label: "Sobre", href: "/sobre", icon: "about" },
  { label: "Músicas", href: "/musicas", icon: "music" },
  { label: "Vídeos", href: "/videos", icon: "video" },
  { label: "Spotify", href: "/spotify", icon: "spotify" },
  { label: "Loja", href: "/loja", icon: "store" },
  { label: "Links", href: "/links", icon: "link" },
  { label: "Contato", href: "/contato", icon: "contact" },
];

export interface ShellSocial {
  label: string;
  url: string;
  icon: string;
  handle: string;
}

export interface ShellData {
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
