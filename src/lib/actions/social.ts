"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  assertAuth,
  bool,
  fail,
  isValidUrl,
  num,
  ok,
  str,
  type ActionState,
} from "./helpers";

function revalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/links");
  revalidatePath("/admin/redes");
}

export async function saveSocialLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  const id = str(formData, "id");
  const label = str(formData, "label");
  const url = str(formData, "url");
  if (!label) return fail("O nome da plataforma é obrigatório.", { label: "Obrigatório" });
  if (!isValidUrl(url)) return fail("Insira uma URL válida.", { url: "URL inválida" });

  const data = {
    label,
    handle: str(formData, "handle"),
    url,
    icon: str(formData, "icon"),
    isActive: bool(formData, "isActive"),
    order: num(formData, "order"),
  };

  if (id) {
    await prisma.socialLink.update({ where: { id }, data });
  } else {
    const count = await prisma.socialLink.count();
    await prisma.socialLink.create({ data: { ...data, order: data.order || count + 1 } });
  }

  revalidate();
  return ok();
}

export async function deleteSocialLink(id: string): Promise<ActionState> {
  await assertAuth();
  await prisma.socialLink.delete({ where: { id } });
  revalidate();
  return ok("Rede removida com sucesso.");
}

export async function toggleSocialLink(id: string): Promise<ActionState> {
  await assertAuth();
  const item = await prisma.socialLink.findUnique({ where: { id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.socialLink.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate();
  return ok();
}

export async function moveSocialLink(id: string, dir: "up" | "down"): Promise<ActionState> {
  await assertAuth();
  const items = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  const idx = items.findIndex((i) => i.id === id);
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swap < 0 || swap >= items.length) return ok();
  await prisma.$transaction([
    prisma.socialLink.update({ where: { id: items[idx].id }, data: { order: items[swap].order } }),
    prisma.socialLink.update({ where: { id: items[swap].id }, data: { order: items[idx].order } }),
  ]);
  revalidate();
  return ok();
}
