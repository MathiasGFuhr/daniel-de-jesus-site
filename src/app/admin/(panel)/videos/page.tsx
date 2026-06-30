import { PageHeading } from "@/components/admin/AdminSection";
import { VideoManager } from "@/components/admin/VideoManager";
import { getVideos } from "@/lib/data";

export default async function VideosAdminPage() {
  const items = await getVideos();
  return (
    <>
      <PageHeading
        title="Vídeos"
        description="Cadastre clipes, lyric videos, bastidores e live sessions."
      />
      <VideoManager
        items={items.map((i) => ({
          id: i.id,
          title: i.title,
          type: i.type,
          description: i.description,
          youtubeUrl: i.youtubeUrl,
          youtubeEmbedUrl: i.youtubeEmbedUrl,
          thumbnailUrl: i.thumbnailUrl,
          publishedAt: i.publishedAt,
          isActive: i.isActive,
          isFeatured: i.isFeatured,
        }))}
      />
    </>
  );
}
