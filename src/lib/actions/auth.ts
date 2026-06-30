"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
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

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
