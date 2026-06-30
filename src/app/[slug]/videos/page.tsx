import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { VideoGrid } from "@/components/VideoGrid";
import { getSiteBySlug, getVideos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vídeos",
  description: "Clipes, lyric videos, bastidores e live sessions.",
};

export default async function VideosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();

  const videos = await getVideos(tenant.id, true);

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
