"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { ok, str, type ActionState } from "./helpers";
import { defaultTheme } from "@/lib/defaults";

export async function updateTheme(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  await prisma.themeSettings.update({
    where: { siteId: site.id },
    data: {
      primaryColor: str(formData, "primaryColor"),
      secondaryColor: str(formData, "secondaryColor"),
      accentColor: str(formData, "accentColor"),
      backgroundColor: str(formData, "backgroundColor"),
      cardColor: str(formData, "cardColor"),
      textColor: str(formData, "textColor"),
      mutedTextColor: str(formData, "mutedTextColor"),
      buttonColor: str(formData, "buttonColor"),
      sidebarColor: str(formData, "sidebarColor"),
      headerColor: str(formData, "headerColor"),
      titleFont: str(formData, "titleFont"),
      bodyFont: str(formData, "bodyFont"),
      cardRadius: str(formData, "cardRadius"),
      buttonStyle: str(formData, "buttonStyle"),
    },
  });

  revalidatePath(`/${site.slug}`, "layout");
  revalidatePath("/admin/aparencia");
  return ok("Cores atualizadas com sucesso.");
}

export async function resetTheme(): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.themeSettings.update({ where: { siteId: site.id }, data: { ...defaultTheme } });
  revalidatePath(`/${site.slug}`, "layout");
  revalidatePath("/admin/aparencia");
  return ok("Aparência restaurada para o padrão.");
}
