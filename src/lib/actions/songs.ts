"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  assertAuth,
  bool,
  fail,
  ok,
  str,
  type ActionState,
} from "./helpers";

function revalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/musicas");
  revalidatePath("/admin/musicas");
}

export async function saveSong(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

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
    await prisma.song.updateMany({ data: { isFeatured: false } });
  }

  if (id) {
    await prisma.song.update({ where: { id }, data });
  } else {
    const count = await prisma.song.count();
    await prisma.song.create({ data: { ...data, order: count + 1 } });
  }

  revalidate();
  return ok();
}

export async function deleteSong(id: string): Promise<ActionState> {
  await assertAuth();
  await prisma.song.delete({ where: { id } });
  revalidate();
  return ok("Música removida com sucesso.");
}

export async function toggleSong(id: string): Promise<ActionState> {
  await assertAuth();
  const item = await prisma.song.findUnique({ where: { id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.song.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate();
  return ok();
}

export async function featureSong(id: string): Promise<ActionState> {
  await assertAuth();
  await prisma.song.updateMany({ data: { isFeatured: false } });
  await prisma.song.update({ where: { id }, data: { isFeatured: true } });
  revalidate();
  return ok("Lançamento principal definido.");
}
