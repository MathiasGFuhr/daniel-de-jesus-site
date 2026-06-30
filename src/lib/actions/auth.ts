"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
import { provisionSite, normalizeSlug, isSlugAvailable } from "@/lib/site-provision";
import { isValidEmail, str, type ActionState } from "./helpers";

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = str(formData, "email");
  const password = String(formData.get("password") ?? "");
  const next = str(formData, "next") || "/admin";

  if (!email || !password) {
    return { ok: false, message: "Informe e-mail e senha." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Insira um e-mail válido." };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { ok: false, message: "E-mail ou senha incorretos." };
  }

  await createSession({ sub: user.id, email: user.email, name: user.name });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = str(formData, "name");
  const email = str(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const artistName = str(formData, "artistName");
  const slugInput = str(formData, "slug") || artistName;
  const slug = normalizeSlug(slugInput);

  if (!name || !email || !password || !artistName) {
    return { ok: false, message: "Preencha todos os campos." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Insira um e-mail válido." };
  }
  if (password.length < 6) {
    return { ok: false, message: "A senha deve ter no mínimo 6 caracteres." };
  }
  if (!slug || slug.length < 3) {
    return {
      ok: false,
      message: "O endereço público deve ter ao menos 3 caracteres (letras, números e hífen).",
      fieldErrors: { slug: "Endereço inválido" },
    };
  }

  const emailTaken = await prisma.user.findUnique({ where: { email } });
  if (emailTaken) {
    return {
      ok: false,
      message: "Já existe uma conta com este e-mail.",
      fieldErrors: { email: "E-mail já cadastrado" },
    };
  }

  if (!(await isSlugAvailable(slug))) {
    return {
      ok: false,
      message: `O endereço "/${slug}" não está disponível. Escolha outro.`,
      fieldErrors: { slug: "Endereço indisponível" },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await provisionSite({
    ownerId: user.id,
    slug,
    artistName,
    ownerEmail: email,
  });

  await createSession({ sub: user.id, email: user.email, name: user.name });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
