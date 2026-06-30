"use client";

import { useState } from "react";
import { TextInput } from "./TextInput";

export function SpotifyPreview({
  defaultEmbed,
  defaultExternal,
}: {
  defaultEmbed: string;
  defaultExternal: string;
}) {
  const [embed, setEmbed] = useState(defaultEmbed);
  const [external, setExternal] = useState(defaultExternal);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="URL embed do Spotify"
          name="embedUrl"
          required
          value={embed}
          onChange={(e) => setEmbed(e.target.value)}
          hint="Ex.: https://open.spotify.com/embed/album/ID"
        />
        <TextInput
          label="URL externa do Spotify"
          name="externalUrl"
          value={external}
          onChange={(e) => setExternal(e.target.value)}
          hint="Ex.: https://open.spotify.com/artist/ID"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Prévia do player
          </span>
          {external && (
            <a
              href={external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-emerald-600 hover:underline"
            >
              Abrir no Spotify →
            </a>
          )}
        </div>
        {embed ? (
          <iframe
            src={embed}
            width="100%"
            height={352}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
            title="Prévia Spotify"
          />
        ) : (
          <p className="py-10 text-center text-sm text-slate-400">
            Insira uma URL de embed para visualizar.
          </p>
        )}
      </div>
    </div>
  );
}
