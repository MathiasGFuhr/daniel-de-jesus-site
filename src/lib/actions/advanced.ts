"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  fail,
  isValidEmail,
  ok,
  str,
  type ActionState,
} from "./helpers";
import { requireSession } from "@/lib/auth";
import { getCurrentSite } from "@/lib/tenant";
import { defaultTheme } from "@/lib/defaults";

export async function updateAdvanced(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();

  await prisma.advancedSettings.update({
    where: { siteId: site.id },
    data: {
      ownerName: str(formData, "ownerName"),
      ownerEmail: str(formData, "ownerEmail"),
      googleAnalyticsId: str(formData, "googleAnalyticsId"),
      metaPixelId: str(formData, "metaPixelId"),
      tiktokPixelId: str(formData, "tiktokPixelId"),
      customHeadCode: str(formData, "customHeadCode"),
      customFooterCode: str(formData, "customFooterCode"),
    },
  });

  revalidatePath(`/${site.slug}`, "layout");
  revalidatePath("/admin/configuracoes");
  return ok();
}

export async function updateCredentials(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireSession();

  const email = str(formData, "loginEmail").toLowerCase();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (!email || !isValidEmail(email)) {
    return fail("Insira um e-mail de login válido.", { loginEmail: "E-mail inválido" });
  }

  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user) return fail("Usuário não encontrado.");

  if (email !== user.email) {
    const taken = await prisma.user.findUnique({ where: { email } });
    if (taken) return fail("Este e-mail já está em uso.", { loginEmail: "E-mail já cadastrado" });
  }

  if (newPassword) {
    if (!currentPassword) return fail("Informe a senha atual para alterá-la.", { currentPassword: "Obrigatório" });
    const okPass = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!okPass) return fail("Senha atual incorreta.", { currentPassword: "Incorreta" });
    if (newPassword.length < 6) return fail("A nova senha deve ter ao menos 6 caracteres.", { newPassword: "Mínimo 6 caracteres" });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      email,
      ...(newPassword ? { passwordHash: await bcrypt.hash(newPassword, 10) } : {}),
    },
  });

  revalidatePath("/admin/configuracoes");
  return ok("Credenciais atualizadas com sucesso.");
}

export async function updateSlug(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const site = await getCurrentSite();
  const { normalizeSlug, isReservedSlug } = await import("@/lib/site-provision");
  const slug = normalizeSlug(str(formData, "slug"));

  if (!slug || slug.length < 3) {
    return fail("O endereço deve ter ao menos 3 caracteres.", { slug: "Endereço inválido" });
  }
  if (isReservedSlug(slug)) {
    return fail("Este endereço é reservado. Escolha outro.", { slug: "Reservado" });
  }
  if (slug !== site.slug) {
    const existing = await prisma.site.findUnique({ where: { slug } });
    if (existing) return fail("Este endereço já está em uso.", { slug: "Indisponível" });
  }

  await prisma.site.update({ where: { id: site.id }, data: { slug } });

  revalidatePath("/admin/configuracoes");
  return ok(`Endereço público atualizado para "/${slug}".`);
}

export async function restoreTheme(): Promise<ActionState> {
  const site = await getCurrentSite();
  await prisma.themeSettings.update({ where: { siteId: site.id }, data: { ...defaultTheme } });
  revalidatePath(`/${site.slug}`, "layout");
  revalidatePath("/admin/configuracoes");
  return ok("Aparência restaurada para o padrão.");
}
