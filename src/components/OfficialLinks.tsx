import { ArrowRightIcon, DynamicIcon } from "./Icons";

export interface OfficialLink {
  label: string;
  handle: string;
  url: string;
  icon: string;
}

const iconBg: Record<string, string> = {
  instagram: "bg-[#E1306C]/10 text-[#C13584]",
  tiktok: "bg-ink/5 text-ink",
  youtube: "bg-[#FF0000]/10 text-[#CC0000]",
  spotify: "bg-[#1DB954]/12 text-[#1DB954]",
  apple: "bg-ink/5 text-ink",
  deezer: "bg-gold/12 text-gold",
  soundcloud: "bg-[#ff5500]/12 text-[#ff5500]",
};

export function OfficialLinks({ links }: { links: OfficialLink[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-line bg-cream-50 p-4 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              iconBg[link.icon] ?? "bg-beige text-ink"
            }`}
          >
            <DynamicIcon name={link.icon} className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-ink">{link.label}</span>
            <span className="block truncate text-xs text-warm-gray">{link.handle}</span>
          </span>
          <ArrowRightIcon className="h-4 w-4 shrink-0 text-warm-gray-light transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
        </a>
      ))}
    </div>
  );
}
