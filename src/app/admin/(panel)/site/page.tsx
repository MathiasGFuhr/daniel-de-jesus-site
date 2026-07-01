import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SelectInput } from "@/components/admin/SelectInput";
import { updateSiteSettings } from "@/lib/actions/site";
import { getSiteSettings } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";

export default async function AdminSitePage() {
  const site = await getCurrentSite();
  const s = await getSiteSettings(site.id);

  return (
    <>
      <PageHeading
        title="Configurações do site"
        description="Informações gerais, identidade e status de publicação."
      />

      <AdminForm action={updateSiteSettings} previewHref={`/${site.slug}`}>
        <AdminSection title="Identidade">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Nome do projeto" name="siteName" defaultValue={s.siteName} />
            <TextInput label="Nome do artista" name="artistName" required defaultValue={s.artistName} />
            <TextInput label="Subtítulo do artista" name="artistLabel" defaultValue={s.artistLabel} />
          </div>
          <div className="mt-4">
            <TextArea label="Descrição geral" name="description" defaultValue={s.description} />
          </div>
        </AdminSection>

        <AdminSection title="Textos do rodapé">
          <div className="space-y-4">
            <TextArea label="Texto do rodapé" name="footerText" defaultValue={s.footerText} rows={2} />
            <TextInput label="Texto de direitos autorais" name="copyrightText" defaultValue={s.copyrightText} />
          </div>
        </AdminSection>

        <AdminSection title="Imagens">
          <div className="grid gap-6 sm:grid-cols-2">
            <ImageUpload label="Logo" name="logoUrl" defaultValue={s.logoUrl} />
            <ImageUpload label="Favicon" name="faviconUrl" defaultValue={s.faviconUrl} hint="Use .ico, .png ou .svg" />
          </div>
        </AdminSection>

        <AdminSection title="Publicação">
          <div className="grid gap-4 sm:grid-cols-2">
            <ToggleSwitch
              name="isPublished"
              label="Site publicado"
              hint="Desative para mostrar uma tela de 'Em breve'."
              defaultChecked={s.isPublished}
            />
            <ToggleSwitch
              name="maintenanceMode"
              label="Modo manutenção"
              hint="Exibe uma tela de manutenção para os visitantes."
              defaultChecked={s.maintenanceMode}
            />
          </div>
        </AdminSection>

        <AdminSection
          title="Idioma da página pública"
          description="Define o idioma padrão do site para visitantes. Eles também podem trocar pelo seletor PT / EN / ES no topo do site."
        >
          <SelectInput
            label="Idioma padrão"
            name="defaultLocale"
            defaultValue={s.defaultLocale}
            options={[
              { value: "pt-BR", label: "Português (Brasil)" },
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
            ]}
            hint="Menus, botões e textos do sistema mudam conforme o idioma escolhido."
          />
        </AdminSection>
      </AdminForm>
    </>
  );
}
