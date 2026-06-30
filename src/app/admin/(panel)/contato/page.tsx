import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateContact, deleteContactMessage } from "@/lib/actions/contact";
import { getContactSettings, getContactMessages, parseContactTypes } from "@/lib/data";

export default async function AdminContatoPage() {
  const [c, messages] = await Promise.all([
    getContactSettings(),
    getContactMessages(),
  ]);
  const types = parseContactTypes(c.contactTypes).join("\n");

  return (
    <>
      <PageHeading
        title="Contato"
        description="Informações de contato e mensagens recebidas pelo formulário."
      />

      <AdminForm action={updateContact} previewHref="/contato">
        <AdminSection title="Informações de contato">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="E-mail comercial" name="email" type="email" required defaultValue={c.email} />
            <TextInput label="Instagram de contato" name="instagram" defaultValue={c.instagram ?? ""} />
            <TextInput label="Endereço (opcional)" name="address" defaultValue={c.address ?? ""} />
          </div>
          <div className="mt-4 grid gap-4">
            <TextInput label="Texto de chamada (headline)" name="headline" defaultValue={c.headline} />
            <TextArea label="Descrição" name="description" defaultValue={c.description} rows={2} />
          </div>
        </AdminSection>

        <AdminSection title="Formulário e avisos">
          <div className="space-y-4">
            <TextArea
              label="Tipos de contato disponíveis"
              name="contactTypes"
              defaultValue={types}
              rows={6}
              hint="Um tipo por linha."
            />
            <TextInput
              label="Aviso de afiliados (loja)"
              name="affiliateDisclaimer"
              defaultValue={c.affiliateDisclaimer}
            />
          </div>
        </AdminSection>
      </AdminForm>

      <div className="mt-8">
        <AdminSection
          title={`Mensagens recebidas (${messages.length})`}
          description="Mensagens enviadas pelo formulário público de contato."
        >
          {messages.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              Nenhuma mensagem recebida ainda.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {messages.map((m) => (
                <li key={m.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-slate-900">{m.name}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                        {m.contactType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{m.email}</p>
                    <p className="mt-1.5 text-sm text-slate-600">{m.message}</p>
                  </div>
                  <DeleteButton
                    label="Remover"
                    title="Remover mensagem?"
                    message="A mensagem será excluída permanentemente."
                    onConfirm={async () => {
                      "use server";
                      return deleteContactMessage(m.id);
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </AdminSection>
      </div>
    </>
  );
}
