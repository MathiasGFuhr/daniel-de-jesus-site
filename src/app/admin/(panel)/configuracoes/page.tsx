import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { updateAdvanced, updateCredentials, updateSlug, restoreTheme } from "@/lib/actions/advanced";
import { getAdvancedSettings } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";
import { getSession } from "@/lib/auth";

export default async function ConfiguracoesPage() {
  const site = await getCurrentSite();
  const [a, session] = await Promise.all([getAdvancedSettings(site.id), getSession()]);

  return (
    <>
      <PageHeading
        title="Configurações avançadas"
        description="Conta, endereço público, integrações de analytics e backup."
      />

      <div className="space-y-8">
        <AdminForm action={updateSlug} submitLabel="Salvar endereço">
          <AdminSection
            title="Endereço público"
            description="É o link onde sua página fica disponível."
          >
            <TextInput
              label="Endereço (slug)"
              name="slug"
              defaultValue={site.slug}
              hint={`Sua página: /${site.slug}`}
            />
          </AdminSection>
        </AdminForm>

        <AdminForm action={updateAdvanced} submitLabel="Salvar integrações">
          <AdminSection title="Proprietário">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Nome do proprietário" name="ownerName" defaultValue={a.ownerName} />
              <TextInput label="E-mail de contato" name="ownerEmail" defaultValue={a.ownerEmail} />
            </div>
          </AdminSection>

          <AdminSection title="Integrações e Analytics">
            <div className="grid gap-4 sm:grid-cols-3">
              <TextInput label="Google Analytics ID" name="googleAnalyticsId" defaultValue={a.googleAnalyticsId} hint="Ex.: G-XXXXXXX" />
              <TextInput label="Meta Pixel ID" name="metaPixelId" defaultValue={a.metaPixelId} />
              <TextInput label="TikTok Pixel ID" name="tiktokPixelId" defaultValue={a.tiktokPixelId} />
            </div>
            <div className="mt-4 grid gap-4">
              <TextArea label="Código personalizado no <head>" name="customHeadCode" defaultValue={a.customHeadCode} rows={4} />
              <TextArea label="Código personalizado no footer" name="customFooterCode" defaultValue={a.customFooterCode} rows={4} />
            </div>
          </AdminSection>
        </AdminForm>

        <AdminForm action={updateCredentials} submitLabel="Atualizar credenciais">
          <AdminSection title="Acesso ao painel">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput
                label="E-mail de login"
                name="loginEmail"
                type="email"
                defaultValue={session?.email ?? ""}
              />
              <div />
              <TextInput label="Senha atual" name="currentPassword" type="password" placeholder="••••••••" />
              <TextInput label="Nova senha" name="newPassword" type="password" placeholder="Deixe em branco para manter" />
            </div>
          </AdminSection>
        </AdminForm>

        <AdminSection
          title="Backup e restauração"
          description="Exporte todas as configurações ou restaure as cores padrão."
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/api/admin/backup"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Baixar backup (.json)
            </a>
            <form
              action={async () => {
                "use server";
                await restoreTheme();
              }}
            >
              <button
                type="submit"
                className="rounded-lg border border-rose-300 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
              >
                Restaurar aparência padrão
              </button>
            </form>
          </div>
        </AdminSection>
      </div>
    </>
  );
}
