import type { SVGProps } from "react";

export type IconName =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "spotify"
  | "apple"
  | "deezer";

export type NavIconName =
  | "home"
  | "about"
  | "music"
  | "video"
  | "spotify"
  | "store"
  | "link"
  | "contact";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------------- Navegação (linha) ---------------- */

export const HomeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

export const AboutIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

export const MusicIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </svg>
);

export const VideoIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M10 9.5v5l4-2.5z" fill="currentColor" stroke="none" />
  </svg>
);

export const StoreIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8h16l-1 12H5L4 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const LinkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
  </svg>
);

export const ContactIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5L20 6" />
  </svg>
);

/* ---------------- Marcas (preenchidas) ---------------- */

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const TiktokIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p} viewBox="0 0 24 24">
    <path d="M16.5 3c.3 2.1 1.6 3.8 3.7 4.2v2.6c-1.4 0-2.7-.4-3.8-1.1v5.7a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V3h2.8z" />
  </svg>
);

export const YoutubeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>
);

export const SpotifyIcon = (p: IconProps) => (
  <svg {...base} {...p} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9.2" />
    <path d="M7.3 9.6c3-0.8 6.6-.5 9.2 1" />
    <path d="M7.8 12.5c2.4-.6 5.3-.4 7.4.9" />
    <path d="M8.3 15.2c1.9-.5 4.1-.3 5.8.7" />
  </svg>
);

export const AppleIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M16.4 12.5c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.4 2.1 2.5 2 1-.1 1.3-.6 2.5-.6s1.5.6 2.6.6 1.7-1 2.4-2c.7-1.1 1-2.1 1-2.2-.1 0-2.4-1-2.4-3.6z" />
    <path d="M14.3 6.3c.6-.7 1-1.6.9-2.6-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5.9.1 1.8-.5 2.5-1.2z" />
  </svg>
);

export const DeezerIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <rect x="3" y="14.5" width="3.4" height="3" rx="0.4" />
    <rect x="7.6" y="14.5" width="3.4" height="3" rx="0.4" />
    <rect x="12.2" y="14.5" width="3.4" height="3" rx="0.4" />
    <rect x="16.8" y="14.5" width="3.4" height="3" rx="0.4" />
    <rect x="7.6" y="11" width="3.4" height="3" rx="0.4" />
    <rect x="12.2" y="11" width="3.4" height="3" rx="0.4" />
    <rect x="16.8" y="11" width="3.4" height="3" rx="0.4" />
    <rect x="12.2" y="7.5" width="3.4" height="3" rx="0.4" />
    <rect x="16.8" y="7.5" width="3.4" height="3" rx="0.4" />
    <rect x="16.8" y="4" width="3.4" height="3" rx="0.4" />
  </svg>
);

export const SoundcloudIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 17v-5" />
    <path d="M7 17v-7" />
    <path d="M10 17v-9" />
    <path d="M13 17V9" />
    <path d="M13 11h5a3 3 0 0 1 0 6h-5" />
  </svg>
);

/* ---------------- Mapas ---------------- */

export const brandIcons: Record<IconName, (p: IconProps) => React.ReactElement> = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  spotify: SpotifyIcon,
  apple: AppleIcon,
  deezer: DeezerIcon,
};

export const navIcons: Record<NavIconName, (p: IconProps) => React.ReactElement> = {
  home: HomeIcon,
  about: AboutIcon,
  music: MusicIcon,
  video: VideoIcon,
  spotify: SpotifyIcon,
  store: StoreIcon,
  link: LinkIcon,
  contact: ContactIcon,
};

export function BrandIcon({
  name,
  ...props
}: { name: IconName } & IconProps) {
  const Cmp = brandIcons[name];
  return <Cmp {...props} />;
}

// Aceita qualquer string vinda do banco (ícone configurável), com fallback.
const anyIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  ...brandIcons,
  soundcloud: SoundcloudIcon,
  store: StoreIcon,
  music: MusicIcon,
  link: LinkIcon,
};

export function DynamicIcon({
  name,
  ...props
}: { name: string } & IconProps) {
  const Cmp = anyIcons[name] ?? LinkIcon;
  return <Cmp {...props} />;
}

export function NavGlyph({
  name,
  ...props
}: { name: NavIconName } & IconProps) {
  const Cmp = navIcons[name];
  return <Cmp {...props} />;
}
