"use client";

import Image from "next/image";
import { Tag } from "./ui";
import { AppleIcon, DeezerIcon, SpotifyIcon, YoutubeIcon } from "./Icons";
import { usePublicI18n } from "./PublicI18nProvider";

export interface SongData {
  id: string;
  title: string;
  type: string;
  year: string;
  coverUrl: string;
  description: string;
  spotifyUrl?: string | null;
  youtubeUrl?: string | null;
  appleMusicUrl?: string | null;
  deezerUrl?: string | null;
}

export function SongCard({ song }: { song: SongData }) {
  const { t } = usePublicI18n();
  const platforms = [
    { url: song.spotifyUrl, label: "Spotify", Icon: SpotifyIcon },
    { url: song.youtubeUrl, label: "YouTube", Icon: YoutubeIcon },
    { url: song.appleMusicUrl, label: "Apple Music", Icon: AppleIcon },
    { url: song.deezerUrl, label: "Deezer", Icon: DeezerIcon },
  ].filter((p) => p.url);

  return (
    <div className="group flex gap-4 rounded-2xl border border-line bg-cream-50 p-4 transition-all hover:border-gold/40 hover:shadow-md sm:flex-col sm:p-0 sm:overflow-hidden">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-beige sm:aspect-square sm:h-auto sm:w-full sm:rounded-none">
        {song.coverUrl && (
          <Image
            src={song.coverUrl}
            alt={song.title}
            fill
            sizes="(max-width: 640px) 96px, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col sm:p-4">
        <div className="flex items-center gap-2">
          <Tag>{song.type}</Tag>
          <span className="text-xs text-warm-gray">{song.year}</span>
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug text-ink">
          {song.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-warm-gray">
          {song.description}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-4">
          {platforms.map(({ url, label, Icon }) => (
            <a
              key={label}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("media.listenOn", { title: song.title, platform: label })}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-warm-gray transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
