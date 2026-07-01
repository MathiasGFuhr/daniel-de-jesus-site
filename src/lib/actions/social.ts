"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { bool, fail, isValidUrl, num, ok, str, type ActionState } from "./helpers";
import { resolveSocialPlatform } from "@/lib/defaults";

function revalidate(slug: string) {
  revalidatePath(`/${slug}`, "layout");
  revalidatePath(`/${slug}/links`);
  revalidatePath("/admin/redes");
}

export async function saveSocialLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const id = str(formData, "id");
  const platform = str(formData, "platform");
  const resolved = resolveSocialPlatform(platform);
  const url = str(formData, "url");
  if (!resolved) {
    return fail("Selecione uma plataforma.", { platform: "Obrigatório" });
  }
  if (!isValidUrl(url)) return fail("Insira uma URL válida.", { url: "URL inválida" });

  const data = {
    label: resolved.label,
    handle: str(formData, "handle"),
    url,
    icon: resolved.icon,
    isActive: bool(formData, "isActive"),
    order: num(formData, "order"),
  };

  if (id) {
    await prisma.socialLink.updateMany({ where: { id, siteId: site.id }, data });
  } else {
    const count = await prisma.socialLink.count({ where: { siteId: site.id } });
    await prisma.socialLink.create({ data: { ...data, siteId: site.id, order: data.order || count + 1 } });
  }

  revalidate(site.slug);
  return ok();
}

export async function deleteSocialLink(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.socialLink.deleteMany({ where: { id, siteId: site.id } });
  revalidate(site.slug);
  return ok("Rede removida com sucesso.");
}

export async function toggleSocialLink(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  const item = await prisma.socialLink.findFirst({ where: { id, siteId: site.id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.socialLink.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate(site.slug);
  return ok();
}

export async function moveSocialLink(id: string, dir: "up" | "down"): Promise<ActionState> {
  const site = await getCurrentSite();
  const items = await prisma.socialLink.findMany({ where: { siteId: site.id }, orderBy: { order: "asc" } });
  const idx = items.findIndex((i) => i.id === id);
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swap < 0 || swap >= items.length) return ok();
  await prisma.$transaction([
    prisma.socialLink.update({ where: { id: items[idx].id }, data: { order: items[swap].order } }),
    prisma.socialLink.update({ where: { id: items[swap].id }, data: { order: items[idx].order } }),
  ]);
  revalidate(site.slug);
  return ok();
}
