"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { bool, fail, isValidUrl, ok, str, type ActionState } from "./helpers";

function revalidate(slug: string) {
  revalidatePath(`/${slug}/links`);
  revalidatePath("/admin/links");
}

export async function updateLinkPage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.linkPage.update({
    where: { siteId: site.id },
    data: {
      avatarUrl: str(formData, "avatarUrl"),
      title: str(formData, "title"),
      subtitle: str(formData, "subtitle"),
    },
  });
  revalidate(site.slug);
  return ok();
}

export async function saveLinkButton(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const id = str(formData, "id");
  const label = str(formData, "label");
  const url = str(formData, "url");
  if (!label) return fail("O título do botão é obrigatório.", { label: "Obrigatório" });
  if (!isValidUrl(url)) return fail("Insira uma URL válida.", { url: "URL inválida" });

  const isPrimary = bool(formData, "isPrimary");
  const data = {
    label,
    subtitle: str(formData, "subtitle") || null,
    url,
    icon: str(formData, "icon"),
    isActive: bool(formData, "isActive"),
    isPrimary,
  };

  if (isPrimary) {
    await prisma.linkPageButton.updateMany({ where: { siteId: site.id }, data: { isPrimary: false } });
  }

  if (id) {
    await prisma.linkPageButton.updateMany({ where: { id, siteId: site.id }, data });
  } else {
    const count = await prisma.linkPageButton.count({ where: { siteId: site.id } });
    await prisma.linkPageButton.create({ data: { ...data, siteId: site.id, order: count + 1 } });
  }

  revalidate(site.slug);
  return ok();
}

export async function deleteLinkButton(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.linkPageButton.deleteMany({ where: { id, siteId: site.id } });
  revalidate(site.slug);
  return ok("Botão removido com sucesso.");
}

export async function toggleLinkButton(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  const item = await prisma.linkPageButton.findFirst({ where: { id, siteId: site.id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.linkPageButton.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate(site.slug);
  return ok();
}

export async function moveLinkButton(id: string, dir: "up" | "down"): Promise<ActionState> {
  const site = await getCurrentSite();
  const items = await prisma.linkPageButton.findMany({ where: { siteId: site.id }, orderBy: { order: "asc" } });
  const idx = items.findIndex((i) => i.id === id);
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swap < 0 || swap >= items.length) return ok();
  await prisma.$transaction([
    prisma.linkPageButton.update({ where: { id: items[idx].id }, data: { order: items[swap].order } }),
    prisma.linkPageButton.update({ where: { id: items[swap].id }, data: { order: items[idx].order } }),
  ]);
  revalidate(site.slug);
  return ok();
}
