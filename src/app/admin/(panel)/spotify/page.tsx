import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { SelectInput } from "@/components/admin/SelectInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { SpotifyPreview } from "@/components/admin/SpotifyPreview";
import { updateSpotify } from "@/lib/actions/spotify";
import { getSpotifySettings } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";
import { SPOTIFY_TYPES } from "@/lib/defaults";

export default async function AdminSpotifyPage() {
  const site = await getCurrentSite();
  const s = await getSpotifySettings(site.id);

  return (
    <>
      <PageHeading
        title="Spotify"
        description="Configure o player do Spotify exibido no site."
      />

      <AdminForm action={updateSpotify} previewHref={`/${site.slug}/spotify`}>
        <AdminSection title="Informações">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Título exibido" name="title" defaultValue={s.title} />
            <TextInput label="Nome do artista" name="artist" defaultValue={s.artist} />
            <SelectInput label="Tipo de conteúdo" name="type" options={SPOTIFY_TYPES} defaultValue={s.type} />
            <ToggleSwitch name="isActive" label="Seção ativa" defaultChecked={s.isActive} />
          </div>
          <div className="mt-4">
            <TextArea label="Descrição" name="description" defaultValue={s.description} rows={2} />
          </div>
        </AdminSection>

        <AdminSection title="Player e links">
          <SpotifyPreview defaultEmbed={s.embedUrl} defaultExternal={s.externalUrl} />
        </AdminSection>
      </AdminForm>
    </>
  );
}
