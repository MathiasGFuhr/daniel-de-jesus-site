import { PageHeading, AdminSection } from "@/components/admin/AdminSection";
import { AdminForm } from "@/components/admin/AdminForm";
import { ColorPicker } from "@/components/admin/ColorPicker";
import { SelectInput } from "@/components/admin/SelectInput";
import { TextInput } from "@/components/admin/TextInput";
import { updateTheme, resetTheme } from "@/lib/actions/theme";
import { getThemeSettings } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";
import { FONT_OPTIONS } from "@/lib/defaults";

export default async function AparenciaPage() {
  const site = await getCurrentSite();
  const t = await getThemeSettings(site.id);

  return (
    <>
      <PageHeading
        title="Aparência e cores"
        description="Personalize as cores, fontes e estilo do site. As mudanças refletem no site público."
      />

      <AdminForm
        action={updateTheme}
        submitLabel="Salvar aparência"
        previewHref={`/${site.slug}`}
        extra={
          <form
            action={async () => {
              "use server";
              await resetTheme();
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Restaurar padrão
            </button>
          </form>
        }
      >
        <AdminSection title="Cores principais">
          <div className="grid gap-5 sm:grid-cols-3">
            <ColorPicker name="primaryColor" label="Cor principal" defaultValue={t.primaryColor} />
            <ColorPicker name="secondaryColor" label="Cor secundária" defaultValue={t.secondaryColor} />
            <ColorPicker name="accentColor" label="Cor de destaque" defaultValue={t.accentColor} />
            <ColorPicker name="backgroundColor" label="Cor de fundo" defaultValue={t.backgroundColor} />
            <ColorPicker name="cardColor" label="Cor dos cards" defaultValue={t.cardColor} />
            <ColorPicker name="buttonColor" label="Cor dos botões" defaultValue={t.buttonColor} />
          </div>
        </AdminSection>

        <AdminSection title="Cores de texto e estrutura">
          <div className="grid gap-5 sm:grid-cols-3">
            <ColorPicker name="textColor" label="Texto principal" defaultValue={t.textColor} />
            <ColorPicker name="mutedTextColor" label="Texto secundário" defaultValue={t.mutedTextColor} />
            <ColorPicker name="sidebarColor" label="Cor da sidebar" defaultValue={t.sidebarColor} />
            <ColorPicker name="headerColor" label="Cor do header" defaultValue={t.headerColor} />
          </div>
        </AdminSection>

        <AdminSection title="Tipografia e estilo">
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectInput label="Fonte dos títulos" name="titleFont" options={FONT_OPTIONS} defaultValue={t.titleFont} />
            <SelectInput label="Fonte dos textos" name="bodyFont" options={FONT_OPTIONS} defaultValue={t.bodyFont} />
            <TextInput label="Arredondamento dos cards" name="cardRadius" defaultValue={t.cardRadius} hint="Ex.: 16px" />
            <SelectInput
              label="Estilo dos botões"
              name="buttonStyle"
              options={["rounded", "pill", "square"]}
              defaultValue={t.buttonStyle}
            />
          </div>
        </AdminSection>
      </AdminForm>
    </>
  );
}
