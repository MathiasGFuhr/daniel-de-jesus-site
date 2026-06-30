"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAuth, ok, str, type ActionState } from "./helpers";

export async function updateAbout(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  await prisma.homeContent.update({
    where: { id: "singleton" },
    data: {
      bioShort: str(formData, "bioShort"),
      bioFull: str(formData, "bioFull"),
      aboutImageUrl: str(formData, "aboutImageUrl"),
      aboutGenre: str(formData, "aboutGenre"),
      aboutYear: str(formData, "aboutYear"),
    },
  });

  revalidatePath("/sobre");
  revalidatePath("/admin/sobre");
  return ok();
}
