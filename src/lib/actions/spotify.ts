"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAuth, bool, fail, isValidUrl, ok, str, type ActionState } from "./helpers";

export async function updateSpotify(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  const embedUrl = str(formData, "embedUrl");
  if (!embedUrl) return fail("O embed do Spotify é obrigatório.", { embedUrl: "Obrigatório" });
  if (!isValidUrl(embedUrl, false)) return fail("Insira uma URL de embed válida.", { embedUrl: "URL inválida" });

  const externalUrl = str(formData, "externalUrl");
  if (externalUrl && !isValidUrl(externalUrl, false)) {
    return fail("Insira uma URL externa válida.", { externalUrl: "URL inválida" });
  }

  await prisma.spotifySettings.update({
    where: { id: "singleton" },
    data: {
      title: str(formData, "title"),
      artist: str(formData, "artist"),
      description: str(formData, "description"),
      embedUrl,
      externalUrl,
      type: str(formData, "type"),
      isActive: bool(formData, "isActive"),
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/spotify");
  revalidatePath("/admin/spotify");
  return ok();
}
