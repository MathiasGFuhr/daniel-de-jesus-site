"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAuth, bool, fail, ok, str, type ActionState } from "./helpers";

export async function updateHome(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  const title = str(formData, "title");
  if (!title) return fail("O título principal é obrigatório.", { title: "Obrigatório" });

  await prisma.homeContent.update({
    where: { id: "singleton" },
    data: {
      eyebrow: str(formData, "eyebrow"),
      title,
      slogan: str(formData, "slogan"),
      description: str(formData, "description"),
      imageUrl: str(formData, "imageUrl"),
      primaryButtonLabel: str(formData, "primaryButtonLabel"),
      primaryButtonUrl: str(formData, "primaryButtonUrl"),
      secondaryButtonLabel: str(formData, "secondaryButtonLabel"),
      secondaryButtonUrl: str(formData, "secondaryButtonUrl"),
      thirdButtonLabel: str(formData, "thirdButtonLabel"),
      thirdButtonUrl: str(formData, "thirdButtonUrl"),
      showHero: bool(formData, "showHero"),
      showFeaturedVideo: bool(formData, "showFeaturedVideo"),
      showSpotify: bool(formData, "showSpotify"),
      showOfficialLinks: bool(formData, "showOfficialLinks"),
      showProducts: bool(formData, "showProducts"),
      showAbout: bool(formData, "showAbout"),
      showContact: bool(formData, "showContact"),
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/sobre");
  revalidatePath("/admin/home");
  return ok();
}
