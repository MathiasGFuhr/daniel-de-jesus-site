import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { SongCard } from "@/components/SongCard";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getSiteBySlug, getSongs, getSpotifySettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Músicas",
  description: "Singles e EPs.",
};

export default async function MusicasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();

  const [songs, spotify] = await Promise.all([
    getSongs(tenant.id, true),
    getSpotifySettings(tenant.id),
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
