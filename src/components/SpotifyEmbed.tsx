import { ArrowUpRightIcon, SpotifyIcon } from "./Icons";

export interface SpotifyData {
  title: string;
  artist: string;
  description: string;
  embedUrl: string;
  externalUrl: string;
}

export function SpotifyEmbed({
  spotify,
  withPlayer = true,
}: {
  spotify: SpotifyData;
  withPlayer?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-cream-50 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {spotify.artist}
          </p>
          <h3 className="font-display text-2xl text-ink">{spotify.title}</h3>
          <p className="text-sm text-warm-gray">{spotify.description}</p>
        </div>
        {spotify.externalUrl && (
          <a
            href={spotify.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1DB954] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
          >
            <SpotifyIcon className="h-4 w-4" />
            Abrir no Spotify
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {withPlayer && spotify.embedUrl && (
        <div className="p-3">
          <iframe
            src={spotify.embedUrl}
            width="100%"
            height={352}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
            title={`${spotify.title} — Spotify`}
          />
        </div>
      )}
    </div>
  );
}
