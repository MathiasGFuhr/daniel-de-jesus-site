"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  assertAuth,
  fail,
  isValidEmail,
  ok,
  str,
  type ActionState,
} from "./helpers";
import { requireSession } from "@/lib/auth";
import {
  defaultSiteSettings,
  defaultTheme,
  defaultHome,
  defaultSpotify,
  defaultContact,
  defaultLinkPage,
} from "@/lib/defaults";

export async function updateAdvanced(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAuth();

  await prisma.advancedSettings.update({
    where: { id: "singleton" },
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

  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracoes");
  return ok();
}

export async function updateCredentials(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireSession();

  const email = str(formData, "loginEmail");
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (!email || !isValidEmail(email)) {
    return fail("Insira um e-mail de login válido.", { loginEmail: "E-mail inválido" });
  }

  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user) return fail("Usuário não encontrado.");

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

export async function restoreDefaults(): Promise<ActionState> {
  await assertAuth();

  const strip = <T extends { id: string }>(o: T) => {
    const { id: _id, ...rest } = o;
    void _id;
    return rest;
  };

  await prisma.siteSettings.update({ where: { id: "singleton" }, data: strip(defaultSiteSettings) });
  await prisma.themeSettings.update({ where: { id: "singleton" }, data: strip(defaultTheme) });
  await prisma.homeContent.update({ where: { id: "singleton" }, data: strip(defaultHome) });
  await prisma.spotifySettings.update({ where: { id: "singleton" }, data: strip(defaultSpotify) });
  await prisma.contactSettings.update({ where: { id: "singleton" }, data: strip(defaultContact) });
  await prisma.linkPage.update({ where: { id: "singleton" }, data: strip(defaultLinkPage) });

  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracoes");
  return ok("Configurações restauradas para o padrão.");
}
