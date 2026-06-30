import { PageHeading } from "@/components/admin/AdminSection";
import { SongManager } from "@/components/admin/SongManager";
import { getSongs } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";

export default async function MusicasAdminPage() {
  const site = await getCurrentSite();
  const items = await getSongs(site.id);
  return (
    <>
      <PageHeading
        title="Músicas"
        description="Cadastre singles, EPs e álbuns exibidos na página de músicas."
      />
      <SongManager
        items={items.map((i) => ({
          id: i.id,
          title: i.title,
          type: i.type,
          year: i.year,
          releaseDate: i.releaseDate,
          coverUrl: i.coverUrl,
          description: i.description,
          spotifyUrl: i.spotifyUrl,
          youtubeUrl: i.youtubeUrl,
          deezerUrl: i.deezerUrl,
          appleMusicUrl: i.appleMusicUrl,
          isActive: i.isActive,
          isFeatured: i.isFeatured,
        }))}
      />
    </>
  );
}
