"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentSite } from "@/lib/tenant";
import {
  fail,
  isValidEmail,
  ok,
  str,
  type ActionState,
} from "./helpers";

export async function updateContact(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  const email = str(formData, "email");
  if (!email || !isValidEmail(email)) {
    return fail("Insira um e-mail comercial válido.", { email: "E-mail inválido" });
  }

  const typesRaw = str(formData, "contactTypes");
  const contactTypes = typesRaw
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

  await prisma.contactSettings.update({
    where: { siteId: site.id },
    data: {
      email,
      headline: str(formData, "headline"),
      description: str(formData, "description"),
      address: str(formData, "address"),
      instagram: str(formData, "instagram"),
      affiliateDisclaimer: str(formData, "affiliateDisclaimer"),
      contactTypes: JSON.stringify(contactTypes),
    },
  });

  revalidatePath(`/${site.slug}`, "layout");
  revalidatePath(`/${site.slug}/contato`);
  revalidatePath(`/${site.slug}/loja`);
  revalidatePath("/admin/contato");
  return ok();
}

export async function deleteContactMessage(id: string): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.contactMessage.deleteMany({ where: { id, siteId: site.id } });
  revalidatePath("/admin/contato");
  return ok("Mensagem removida com sucesso.");
}
