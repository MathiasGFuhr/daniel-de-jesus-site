import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { SongCard } from "@/components/SongCard";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getPublicI18n } from "@/lib/i18n";
import { getSiteBySlug, getSongs, getSpotifySettings } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await getPublicI18n(slug);
  return { title: t("meta.music"), description: t("meta.musicDesc") };
}

export default async function MusicasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const { t } = await getPublicI18n(slug);

  const [songs, spotify] = await Promise.all([
    getSongs(tenant.id, true),
    getSpotifySettings(tenant.id),
  ]);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("music.eyebrow")}
        title={t("music.title")}
        description={t("music.description")}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {spotify.isActive && (
        <div className="mt-14">
          <SectionHeading eyebrow={t("music.featured")} title={t("music.fullEp")} />
          <SpotifyEmbed spotify={spotify} />
        </div>
      )}
    </Section>
  );
}
