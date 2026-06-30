import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateHome } from "@/lib/actions/home";
import { getHomeContent } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";

export default async function AdminHomePage() {
  const site = await getCurrentSite();
  const h = await getHomeContent(site.id);

  return (
    <>
      <PageHeading
        title="Editar Home"
        description="Conteúdo da seção principal e seções visíveis no site."
      />

      <AdminForm action={updateHome} previewHref={`/${site.slug}`}>
        <AdminSection title="Hero Section">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Texto acima do título" name="eyebrow" defaultValue={h.eyebrow} />
            <TextInput label="Título principal" name="title" required defaultValue={h.title} />
          </div>
          <div className="mt-4 grid gap-4">
            <TextArea label="Slogan" name="slogan" defaultValue={h.slogan} rows={2} />
            <TextArea label="Descrição curta" name="description" defaultValue={h.description} rows={2} />
            <ImageUpload label="Imagem principal do cantor" name="imageUrl" defaultValue={h.imageUrl} />
          </div>
        </AdminSection>

        <AdminSection title="Botões">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Botão 1 — texto" name="primaryButtonLabel" defaultValue={h.primaryButtonLabel} />
            <TextInput label="Botão 1 — link" name="primaryButtonUrl" defaultValue={h.primaryButtonUrl} />
            <TextInput label="Botão 2 — texto" name="secondaryButtonLabel" defaultValue={h.secondaryButtonLabel} />
            <TextInput label="Botão 2 — link" name="secondaryButtonUrl" defaultValue={h.secondaryButtonUrl} />
            <TextInput label="Botão 3 — texto" name="thirdButtonLabel" defaultValue={h.thirdButtonLabel} />
            <TextInput label="Botão 3 — link" name="thirdButtonUrl" defaultValue={h.thirdButtonUrl} />
          </div>
        </AdminSection>

        <AdminSection
          title="Seções do site"
          description="Ative ou desative seções. As desativadas não aparecem no site."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleSwitch name="showHero" label="Hero (seção principal)" defaultChecked={h.showHero} />
            <ToggleSwitch name="showFeaturedVideo" label="Vídeo em destaque" defaultChecked={h.showFeaturedVideo} />
            <ToggleSwitch name="showSpotify" label="Spotify" defaultChecked={h.showSpotify} />
            <ToggleSwitch name="showOfficialLinks" label="Links oficiais" defaultChecked={h.showOfficialLinks} />
            <ToggleSwitch name="showProducts" label="Produtos" defaultChecked={h.showProducts} />
            <ToggleSwitch name="showAbout" label="Sobre" defaultChecked={h.showAbout} />
            <ToggleSwitch name="showContact" label="Contato" defaultChecked={h.showContact} />
          </div>
        </AdminSection>
      </AdminForm>
    </>
  );
}
