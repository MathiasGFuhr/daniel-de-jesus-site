import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { VideoGrid } from "@/components/VideoGrid";
import { getPublicI18n } from "@/lib/i18n";
import { getSiteBySlug, getVideos } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await getPublicI18n(slug);
  return { title: t("meta.videos"), description: t("meta.videosDesc") };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const { t } = await getPublicI18n(slug);

  const videos = await getVideos(tenant.id, true);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("videos.eyebrow")}
        title={t("videos.title")}
        description={t("videos.description")}
      />
      <VideoGrid videos={videos} />
    </Section>
  );
}
