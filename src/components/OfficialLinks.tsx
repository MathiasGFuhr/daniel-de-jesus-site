import { ArrowRightIcon, DynamicIcon } from "./Icons";
import { SOCIAL_PLATFORMS } from "@/lib/defaults";

export interface OfficialLink {
  label: string;
  handle: string;
  url: string;
  icon: string;
}

const platformStyle: Record<
  string,
  { surface: string; icon: string; accent: string; hover: string }
> = {
  instagram: {
    surface: "from-[#E1306C]/8 to-cream-50",
    icon: "bg-[#E1306C]/12 text-[#C13584] ring-[#E1306C]/20",
    accent: "bg-[#E1306C]",
    hover: "group-hover:border-[#E1306C]/35 group-hover:shadow-[#E1306C]/10",
  },
  tiktok: {
    surface: "from-ink/5 to-cream-50",
    icon: "bg-ink/6 text-ink ring-ink/10",
    accent: "bg-ink",
    hover: "group-hover:border-ink/20 group-hover:shadow-ink/5",
  },
  youtube: {
    surface: "from-[#FF0000]/8 to-cream-50",
    icon: "bg-[#FF0000]/10 text-[#CC0000] ring-[#FF0000]/20",
    accent: "bg-[#FF0000]",
    hover: "group-hover:border-[#FF0000]/30 group-hover:shadow-[#FF0000]/10",
  },
  spotify: {
    surface: "from-[#1DB954]/10 to-cream-50",
    icon: "bg-[#1DB954]/12 text-[#1DB954] ring-[#1DB954]/20",
    accent: "bg-[#1DB954]",
    hover: "group-hover:border-[#1DB954]/35 group-hover:shadow-[#1DB954]/10",
  },
  apple: {
    surface: "from-ink/5 to-cream-50",
    icon: "bg-ink/6 text-ink ring-ink/10",
    accent: "bg-ink",
    hover: "group-hover:border-gold/40 group-hover:shadow-gold/10",
  },
  deezer: {
    surface: "from-gold/10 to-cream-50",
    icon: "bg-gold/12 text-gold ring-gold/20",
    accent: "bg-gold",
    hover: "group-hover:border-gold/40 group-hover:shadow-gold/10",
  },
  soundcloud: {
    surface: "from-[#ff5500]/10 to-cream-50",
    icon: "bg-[#ff5500]/12 text-[#ff5500] ring-[#ff5500]/20",
    accent: "bg-[#ff5500]",
    hover: "group-hover:border-[#ff5500]/35 group-hover:shadow-[#ff5500]/10",
  },
};

const fallbackStyle = {
  surface: "from-beige/40 to-cream-50",
  icon: "bg-beige text-ink ring-line",
  accent: "bg-gold",
  hover: "group-hover:border-gold/40 group-hover:shadow-gold/10",
};

function platformLabel(icon: string, label: string): string {
  const match = SOCIAL_PLATFORMS.find((p) => p.icon === icon);
  return match?.label ?? label;
}

function displayHandle(handle: string, url: string, icon: string): string {
  const trimmed = handle?.trim();
  if (trimmed) return trimmed;

  const defaults: Record<string, string> = {
    spotify: "Ouça agora",
    apple: "Apple Music",
    deezer: "Ouça no Deezer",
    soundcloud: "SoundCloud",
  };
  if (defaults[icon]) return defaults[icon];

  try {
    const parsed = new URL(url);
    const segment = parsed.pathname.split("/").filter(Boolean)[0];
    if (segment) return segment.startsWith("@") ? segment : `@${segment}`;
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return "Abrir perfil";
  }
}

export function OfficialLinks({ links }: { links: OfficialLink[] }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line/70 bg-gradient-to-br from-cream-50 via-cream-50 to-beige/25 p-5 sm:p-7 lg:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-beige/40 blur-3xl"
        aria-hidden
      />

      <div
        className="relative grid gap-3 sm:gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(11.5rem, 1fr))" }}
      >
        {links.map((link, index) => {
          const style = platformStyle[link.icon] ?? fallbackStyle;
          const name = platformLabel(link.icon, link.label);
          const handle = displayHandle(link.handle, link.url, link.icon);

          return (
            <a
              key={`${link.icon}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-line/60 bg-gradient-to-br ${style.surface} p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[10.5rem] sm:p-5 ${style.hover}`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span
                className={`absolute left-0 top-0 h-0.5 w-full ${style.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden
              />

              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${style.icon}`}
                >
                  <DynamicIcon name={link.icon} className="h-5 w-5" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line/60 bg-cream/60 text-warm-gray-light opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-gold">
                  <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </span>
              </div>

              <div className="mt-4">
                <span className="block font-display text-lg leading-tight text-ink sm:text-xl">
                  {name}
                </span>
                <span className="mt-1.5 block truncate text-[11px] font-medium uppercase tracking-[0.14em] text-warm-gray">
                  {handle}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
