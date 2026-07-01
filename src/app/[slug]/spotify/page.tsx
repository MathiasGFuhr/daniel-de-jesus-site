import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getPublicI18n } from "@/lib/i18n";
import { getSiteBySlug, getSpotifySettings } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await getPublicI18n(slug);
  return { title: t("meta.spotify"), description: t("meta.spotifyDesc") };
}

export default async function SpotifyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const { t } = await getPublicI18n(slug);

  const s = await getSpotifySettings(tenant.id);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("spotify.eyebrow")}
        title={t("spotify.title")}
        description={`${s.title} — ${s.description}`}
      />
      <div className="max-w-3xl">
        <SpotifyEmbed spotify={s} />
      </div>
    </Section>
  );
}
