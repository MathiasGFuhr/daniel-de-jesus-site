import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui";
import { SongCard } from "@/components/SongCard";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getSongs, getSpotifySettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Músicas",
  description: "Singles e EPs.",
};

export default async function MusicasPage() {
  const [songs, spotify] = await Promise.all([
    getSongs(true),
    getSpotifySettings(),
  ]);

  return (
    <Section>
      <SectionHeading
        eyebrow="Discografia"
        title="Músicas"
        description="Singles e EPs disponíveis no Spotify, YouTube, Apple Music e Deezer."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {spotify.isActive && (
        <div className="mt-14">
          <SectionHeading eyebrow="Em destaque" title="Ouça o EP completo" />
          <SpotifyEmbed spotify={spotify} />
        </div>
      )}
    </Section>
  );
}
