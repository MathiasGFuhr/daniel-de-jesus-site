import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { LinkButtonManager } from "@/components/admin/LinkButtonManager";
import { updateLinkPage } from "@/lib/actions/links";
import { getLinkPage, getLinkButtons } from "@/lib/data";

export default async function LinksAdminPage() {
  const [page, buttons] = await Promise.all([
    getLinkPage(),
    getLinkButtons(),
  ]);

  return (
    <>
      <PageHeading
        title="Central de links"
        description="Configure a página /links usada na bio do Instagram e TikTok."
      />

      <div className="space-y-8">
        <AdminForm action={updateLinkPage} previewHref="/links" submitLabel="Salvar cabeçalho">
          <AdminSection title="Cabeçalho da página de links">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Nome exibido" name="title" defaultValue={page.title} />
              <TextInput label="Descrição curta" name="subtitle" defaultValue={page.subtitle} />
            </div>
            <div className="mt-4">
              <ImageUpload label="Avatar" name="avatarUrl" defaultValue={page.avatarUrl} />
            </div>
          </AdminSection>
        </AdminForm>

        <AdminSection title="Botões de link">
          <LinkButtonManager
            items={buttons.map((b) => ({
              id: b.id,
              label: b.label,
              subtitle: b.subtitle,
              url: b.url,
              icon: b.icon,
              isActive: b.isActive,
              isPrimary: b.isPrimary,
              order: b.order,
            }))}
          />
        </AdminSection>
      </div>
    </>
  );
}
