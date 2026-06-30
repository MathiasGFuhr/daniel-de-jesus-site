import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getSiteBySlug, getSpotifySettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Spotify",
  description: "Ouça no Spotify.",
};

export default async function SpotifyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();

  const s = await getSpotifySettings(tenant.id);

  return (
    <Section>
      <SectionHeading
        eyebrow="Streaming"
        title="Ouça no Spotify"
        description={`${s.title} — ${s.description}`}
      />
      <div className="max-w-3xl">
        <SpotifyEmbed spotify={s} />
      </div>
    </Section>
  );
}
