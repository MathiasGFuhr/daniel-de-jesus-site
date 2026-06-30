"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import { bool, fail, isValidUrl, num, ok, str, type ActionState } from "./helpers";

function revalidate(slug: string) {
  revalidatePath(`/${slug}`, "layout");
  revalidatePath(`/${slug}/loja`);
  revalidatePath("/admin/produtos");
}

export async function saveProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const id = str(formData, "id");
  const name = str(formData, "name");
  const price = str(formData, "price");
  const url = str(formData, "url");

  if (!name) return fail("O nome do produto é obrigatório.", { name: "Obrigatório" });
  if (!price) return fail("O preço é obrigatório.", { price: "Obrigatório" });
  if (!url || !isValidUrl(url)) return fail("Insira um link de compra válido.", { url: "Link inválido" });

  const data = {
    name,
    category: str(formData, "category"),
    price,
    imageUrl: str(formData, "imageUrl"),
    url,
    type: str(formData, "type") || "Afiliado",
    tag: str(formData, "tag") || null,
    description: str(formData, "description"),
    isActive: bool(formData, "isActive"),
    order: num(formData, "order"),
  };

  if (id) {
    await prisma.product.updateMany({ where: { id, siteId: site.id }, data });
  } else {
    const count = await prisma.product.count({ where: { siteId: site.id } });
    await prisma.product.create({ data: { ...data, siteId: site.id, order: data.order || count + 1 } });
  }

  revalidate(site.slug);
  return ok();
}

export async function deleteProduct(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.product.deleteMany({ where: { id, siteId: site.id } });
  revalidate(site.slug);
  return ok("Produto removido com sucesso.");
}

export async function toggleProduct(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  const item = await prisma.product.findFirst({ where: { id, siteId: site.id } });
  if (!item) return fail("Item não encontrado.");
  await prisma.product.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidate(site.slug);
  return ok();
}

export async function moveProduct(id: string, dir: "up" | "down"): Promise<ActionState> {
  const site = await getCurrentSite();
  const items = await prisma.product.findMany({ where: { siteId: site.id }, orderBy: { order: "asc" } });
  const idx = items.findIndex((i) => i.id === id);
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swap < 0 || swap >= items.length) return ok();
  await prisma.$transaction([
    prisma.product.update({ where: { id: items[idx].id }, data: { order: items[swap].order } }),
    prisma.product.update({ where: { id: items[swap].id }, data: { order: items[idx].order } }),
  ]);
  revalidate(site.slug);
  return ok();
}
