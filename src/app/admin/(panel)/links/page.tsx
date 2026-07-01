import Link from "next/link";
import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { LinkButtonManager } from "@/components/admin/LinkButtonManager";
import { SyncedSocialLinks } from "@/components/admin/SyncedSocialLinks";
import { updateLinkPage } from "@/lib/actions/links";
import { getLinkPage, getLinkButtons, getSocialLinks } from "@/lib/data";
import { buildLinksPageItems } from "@/lib/links-page";
import { getCurrentSite } from "@/lib/tenant";

export default async function LinksAdminPage() {
  const site = await getCurrentSite();
  const [page, socials, buttons] = await Promise.all([
    getLinkPage(site.id),
    getSocialLinks(site.id),
    getLinkButtons(site.id),
  ]);
  const previewItems = buildLinksPageItems(socials, buttons, true);

  return (
    <>
      <PageHeading
        title="Central de links"
        description="Página /links para bio do Instagram e TikTok. Redes sociais vêm de Redes sociais — aqui você só configura o cabeçalho e links extras."
      />

      <div className="space-y-8">
        <AdminForm action={updateLinkPage} previewHref={`/${site.slug}/links`} submitLabel="Salvar cabeçalho">
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

        <AdminSection title="Redes sociais (sincronizado)">
          <SyncedSocialLinks
            items={socials.map((s) => ({
              id: s.id,
              label: s.label,
              handle: s.handle,
              url: s.url,
              icon: s.icon,
              isActive: s.isActive,
            }))}
          />
        </AdminSection>

        <AdminSection
          title="Outros links"
          description="Links extras como loja, contato ou parceiros. Não cadastre redes sociais aqui — use Redes sociais."
        >
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

        {previewItems.length > 0 && (
          <p className="text-center text-xs text-slate-500">
            Prévia: {previewItems.length} botão{previewItems.length === 1 ? "" : "ões"} na página pública ·{" "}
            <Link href={`/${site.slug}/links`} target="_blank" className="font-medium text-slate-700 underline">
              Abrir /{site.slug}/links
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
