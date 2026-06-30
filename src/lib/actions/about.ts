"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { ok, str, type ActionState } from "./helpers";

export async function updateAbout(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  await prisma.homeContent.update({
    where: { siteId: site.id },
    data: {
      bioShort: str(formData, "bioShort"),
      bioFull: str(formData, "bioFull"),
      aboutImageUrl: str(formData, "aboutImageUrl"),
      aboutGenre: str(formData, "aboutGenre"),
      aboutYear: str(formData, "aboutYear"),
    },
  });

  revalidatePath(`/${site.slug}/sobre`);
  revalidatePath("/admin/sobre");
  return ok();
}
