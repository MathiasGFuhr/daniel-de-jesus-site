"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAuth, bool, fail, ok, str, type ActionState } from "./helpers";

export async function updateSiteSettings(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  const artistName = str(formData, "artistName");
  if (!artistName) return fail("O nome do artista é obrigatório.", { artistName: "Obrigatório" });

  await prisma.siteSettings.update({
    where: { id: "singleton" },
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

  revalidatePath("/", "layout");
  revalidatePath("/admin/site");
  return ok();
}
