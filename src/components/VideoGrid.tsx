"use client";

import { useState } from "react";
import Image from "next/image";
import { Tag } from "./ui";
import { CloseIcon, PlayIcon } from "./Icons";

export interface VideoData {
  id: string;
  title: string;
  type: string;
  thumbnailUrl: string;
  youtubeEmbedUrl: string;
  youtubeUrl?: string;
}

function toEmbedSrc(url: string): string {
  if (!url) return "";
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/);
  const base = m ? `https://www.youtube.com/embed/${m[1]}` : url;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}autoplay=1&rel=0`;
}

export function VideoGrid({ videos }: { videos: VideoData[] }) {
  const [active, setActive] = useState<VideoData | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="group text-left"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink">
              {video.thumbnailUrl && (
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/10" />
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg transition-transform group-hover:scale-110">
                <PlayIcon className="ml-0.5 h-5 w-5" />
              </span>
              <span className="absolute left-3 top-3">
                <Tag tone="gold">{video.type}</Tag>
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg text-ink">{video.title}</h3>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
          <div className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Fechar vídeo"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink hover:bg-cream"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-ink">
              <iframe
                src={toEmbedSrc(active.youtubeEmbedUrl || active.youtubeUrl || "")}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
