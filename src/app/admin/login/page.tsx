"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";
import type { ActionState } from "@/lib/actions/helpers";

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [state, formAction] = useActionState<ActionState, FormData>(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Painel administrativo
          </span>
          <h1 className="mt-2 font-semibold text-2xl text-white">Daniel de Jesus</h1>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl"
        >
          <input type="hidden" name="next" value={next} />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@exemplo.com"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3.5 py-2.5 text-sm text-white outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3.5 py-2.5 text-sm text-white outline-none focus:border-slate-400"
            />
          </div>

          {state && !state.ok && (
            <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Acesso restrito ao proprietário do site.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
