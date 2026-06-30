"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { bool, fail, ok, str, type ActionState } from "./helpers";

export async function updateSiteSettings(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const artistName = str(formData, "artistName");
  if (!artistName) return fail("O nome do artista é obrigatório.", { artistName: "Obrigatório" });

  await prisma.siteSettings.update({
    where: { siteId: site.id },
    data: {
      siteName: str(formData, "siteName"),
      artistName,
      artistLabel: str(formData, "artistLabel"),
      description: str(formData, "description"),
      footerText: str(formData, "footerText"),
      aiDisclosureText: str(formData, "aiDisclosureText"),
      copyrightText: str(formData, "copyrightText"),
      logoUrl: str(formData, "logoUrl"),
      faviconUrl: str(formData, "faviconUrl"),
      isPublished: bool(formData, "isPublished"),
      maintenanceMode: bool(formData, "maintenanceMode"),
    },
  });

  revalidatePath(`/${site.slug}`, "layout");
  revalidatePath("/admin/site");
  return ok();
}
