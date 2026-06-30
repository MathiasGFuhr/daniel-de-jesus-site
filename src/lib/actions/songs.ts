"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { bool, fail, ok, str, type ActionState } from "./helpers";

function revalidate(slug: string) {
  revalidatePath(`/${slug}`, "layout");
  revalidatePath(`/${slug}/musicas`);
  revalidatePath("/admin/musicas");
}

export async function saveSong(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return fail("O título é obrigatório.", { title: "Obrigatório" });

  const isFeatured = bool(formData, "isFeatured");

  const data = {
    title,
    type: str(formData, "type") || "Single",
    year: str(formData, "year"),
    releaseDate: str(formData, "releaseDate") || null,
    coverUrl: str(formData, "coverUrl"),
    description: str(formData, "description"),
    spotifyUrl: str(formData, "spotifyUrl") || null,
    youtubeUrl: str(formData, "youtubeUrl") || null,
    deezerUrl: str(formData, "deezerUrl") || null,
    appleMusicUrl: str(formData, "appleMusicUrl") || null,
    isActive: bool(formData, "isActive"),
    isFeatured,
  };

  if (isFeatured) {
    await prisma.song.updateMany({ where: { siteId: site.id }, data: { isFeatured: false } });
  }

  if (id) {
    await prisma.song.updateMany({ where: { id, siteId: site.id }, data });
  } else {
    const count = await prisma.song.count({ where: { siteId: site.id } });
    await prisma.song.create({ data: { ...data, siteId: site.id, order: count + 1 } });
  }

  revalidate(site.slug);
  return ok();
}

export async function deleteSong(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.song.deleteMany({ where: { id, siteId: site.id } });
  revalidate(site.slug);
  return ok("Música removida com sucesso.");
}

export async function toggleSong(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  const item = await prisma.song.findFirst({ where: { id, siteId: site.id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.song.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate(site.slug);
  return ok();
}

export async function featureSong(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.song.updateMany({ where: { siteId: site.id }, data: { isFeatured: false } });
  await prisma.song.updateMany({ where: { id, siteId: site.id }, data: { isFeatured: true } });
  revalidate(site.slug);
  return ok("Lançamento principal definido.");
}
