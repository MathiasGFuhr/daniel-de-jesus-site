import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui";
import { VideoGrid } from "@/components/VideoGrid";
import { getVideos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vídeos",
  description: "Clipes, lyric videos, bastidores e live sessions.",
};

export default async function VideosPage() {
  const videos = await getVideos(true);

  return (
    <Section>
      <SectionHeading
        eyebrow="Galeria"
        title="Vídeos"
        description="Clipes oficiais, lyric videos, bastidores e live sessions. Clique para assistir."
      />
      <VideoGrid videos={videos} />
    </Section>
  );
}
