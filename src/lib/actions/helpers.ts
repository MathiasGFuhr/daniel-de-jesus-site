import { requireSession } from "@/lib/auth";

export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
} | null;

export async function assertAuth() {
  await requireSession();
}

export function ok(message = "Alterações salvas com sucesso."): ActionState {
  return { ok: true, message };
}

export function fail(
  message: string,
  fieldErrors?: Record<string, string>,
): ActionState {
  return { ok: false, message, fieldErrors };
}

export function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export function bool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}

export function num(formData: FormData, key: string, fallback = 0): number {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? v : fallback;
}

export function isValidUrl(value: string, allowRelative = true): boolean {
  if (!value) return false;
  if (allowRelative && value.startsWith("/")) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
