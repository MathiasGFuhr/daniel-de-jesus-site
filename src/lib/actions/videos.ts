"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  assertAuth,
  bool,
  fail,
  isValidUrl,
  ok,
  str,
  type ActionState,
} from "./helpers";

function revalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/videos");
  revalidatePath("/admin/videos");
}

export function toEmbed(url: string): string {
  if (!url) return "";
  // Converte watch?v=ID, youtu.be/ID, shorts/ID ou /embed/ID em /embed/ID.
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export async function saveVideo(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  const id = str(formData, "id");
  const title = str(formData, "title");
  const youtubeUrl = str(formData, "youtubeUrl");
  if (!title) return fail("O título é obrigatório.", { title: "Obrigatório" });
  if (!isValidUrl(youtubeUrl, false)) return fail("Insira uma URL do YouTube válida.", { youtubeUrl: "URL inválida" });

  // Sempre normaliza para o formato /embed/ (mesmo que o usuário cole uma URL watch).
  const embed = toEmbed(str(formData, "youtubeEmbedUrl") || youtubeUrl);
  const isFeatured = bool(formData, "isFeatured");

  const data = {
    title,
    type: str(formData, "type") || "Clipe oficial",
    description: str(formData, "description"),
    youtubeUrl,
    youtubeEmbedUrl: embed,
    thumbnailUrl: str(formData, "thumbnailUrl"),
    publishedAt: str(formData, "publishedAt") || null,
    isActive: bool(formData, "isActive"),
    isFeatured,
  };

  if (isFeatured) {
    await prisma.video.updateMany({ data: { isFeatured: false } });
  }

  if (id) {
    await prisma.video.update({ where: { id }, data });
  } else {
    const count = await prisma.video.count();
    await prisma.video.create({ data: { ...data, order: count + 1 } });
  }

  revalidate();
  return ok();
}

export async function deleteVideo(id: string): Promise<ActionState> {
  await assertAuth();
  await prisma.video.delete({ where: { id } });
  revalidate();
  return ok("Vídeo removido com sucesso.");
}

export async function toggleVideo(id: string): Promise<ActionState> {
  await assertAuth();
  const item = await prisma.video.findUnique({ where: { id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.video.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate();
  return ok();
}

export async function featureVideo(id: string): Promise<ActionState> {
  await assertAuth();
  await prisma.video.updateMany({ data: { isFeatured: false } });
  await prisma.video.update({ where: { id }, data: { isFeatured: true } });
  revalidate();
  return ok("Vídeo em destaque definido.");
}
