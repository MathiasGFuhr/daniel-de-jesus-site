"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  assertAuth,
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
  await assertAuth();

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
    where: { id: "singleton" },
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

  revalidatePath("/", "layout");
  revalidatePath("/contato");
  revalidatePath("/loja");
  revalidatePath("/admin/contato");
  return ok();
}

export async function deleteContactMessage(id: string): Promise<ActionState> {
  await assertAuth();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/contato");
  return ok("Mensagem removida com sucesso.");
}
