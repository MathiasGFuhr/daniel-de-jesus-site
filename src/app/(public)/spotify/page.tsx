import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getSpotifySettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Spotify",
  description: "Ouça no Spotify.",
};

export default async function SpotifyPage() {
  const s = await getSpotifySettings();

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
