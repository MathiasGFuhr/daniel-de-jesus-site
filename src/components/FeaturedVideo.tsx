"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon, YoutubeIcon } from "./Icons";

export interface FeaturedVideoData {
  title: string;
  subtitle: string;
  releaseInfo: string;
  youtubeEmbedUrl: string;
  youtubeUrl: string;
  thumbnail: string;
}

export function FeaturedVideo({ video }: { video: FeaturedVideoData }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-cream-50 shadow-sm">
      <div className="relative aspect-video w-full bg-ink">
        {playing ? (
          <iframe
            src={`${video.youtubeEmbedUrl}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Reproduzir ${video.title}`}
          >
            {video.thumbnail && (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg transition-transform group-hover:scale-105">
              <PlayIcon className="ml-1 h-6 w-6" />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {video.subtitle}
          </p>
          <h3 className="mt-1 font-display text-2xl text-ink">{video.title}</h3>
          <p className="mt-1 text-sm text-warm-gray">{video.releaseInfo}</p>
        </div>
        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink/40"
        >
          <YoutubeIcon className="h-4 w-4" />
          Assistir no YouTube
        </a>
      </div>
    </div>
  );
}
