import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateAbout } from "@/lib/actions/about";
import { getHomeContent } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";

export default async function AdminSobrePage() {
  const site = await getCurrentSite();
  const h = await getHomeContent(site.id);

  return (
    <>
      <PageHeading
        title="Editar Sobre"
        description="Conteúdo da página pública Sobre: biografia, imagem e informações."
      />

      <AdminForm action={updateAbout} previewHref={`/${site.slug}/sobre`}>
        <AdminSection title="Biografia">
          <div className="space-y-4">
            <TextArea
              label="Bio curta"
              name="bioShort"
              defaultValue={h.bioShort}
              rows={2}
              hint="Frase de destaque que aparece logo abaixo do título."
            />
            <TextArea
              label="Bio completa"
              name="bioFull"
              defaultValue={h.bioFull}
              rows={7}
              hint="Separe parágrafos com uma linha em branco."
            />
          </div>
        </AdminSection>

        <AdminSection title="Imagem">
          <ImageUpload
            label="Imagem da página Sobre"
            name="aboutImageUrl"
            defaultValue={h.aboutImageUrl}
            hint="Se ficar em branco, usa a imagem principal da Home."
          />
        </AdminSection>

        <AdminSection title="Informações (cards)">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Gênero musical" name="aboutGenre" defaultValue={h.aboutGenre} />
            <TextInput label="Ano de estreia" name="aboutYear" defaultValue={h.aboutYear} />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            O card de Plataformas é preenchido automaticamente com as redes sociais ativas.
          </p>
        </AdminSection>
      </AdminForm>
    </>
  );
}
