"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { bool, fail, isValidUrl, ok, str, type ActionState } from "./helpers";

function revalidate(slug: string) {
  revalidatePath(`/${slug}`, "layout");
  revalidatePath(`/${slug}/videos`);
  revalidatePath("/admin/videos");
}

function toEmbed(url: string): string {
  if (!url) return "";
  // Converte watch?v=ID, youtu.be/ID, shorts/ID ou /embed/ID em /embed/ID.
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export async function saveVideo(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const id = str(formData, "id");
  const title = str(formData, "title");
  const youtubeUrl = str(formData, "youtubeUrl");
  if (!title) return fail("O título é obrigatório.", { title: "Obrigatório" });
  if (!isValidUrl(youtubeUrl, false)) return fail("Insira uma URL do YouTube válida.", { youtubeUrl: "URL inválida" });

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
    await prisma.video.updateMany({ where: { siteId: site.id }, data: { isFeatured: false } });
  }

  if (id) {
    await prisma.video.updateMany({ where: { id, siteId: site.id }, data });
  } else {
    const count = await prisma.video.count({ where: { siteId: site.id } });
    await prisma.video.create({ data: { ...data, siteId: site.id, order: count + 1 } });
  }

  revalidate(site.slug);
  return ok();
}

export async function deleteVideo(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.video.deleteMany({ where: { id, siteId: site.id } });
  revalidate(site.slug);
  return ok("Vídeo removido com sucesso.");
}

export async function toggleVideo(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  const item = await prisma.video.findFirst({ where: { id, siteId: site.id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.video.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate(site.slug);
  return ok();
}

export async function featureVideo(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.video.updateMany({ where: { siteId: site.id }, data: { isFeatured: false } });
  await prisma.video.updateMany({ where: { id, siteId: site.id }, data: { isFeatured: true } });
  revalidate(site.slug);
  return ok("Vídeo em destaque definido.");
}
