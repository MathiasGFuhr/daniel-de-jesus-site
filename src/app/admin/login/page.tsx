"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";
import type { ActionState } from "@/lib/actions/helpers";

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    loginAction,
    null,
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 py-12">
      {/* Detalhes decorativos sutis */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-beige/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-10 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Painel administrativo
          </span>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Daniel <span className="text-gold">de Jesus</span>
          </h1>
          <div className="mx-auto mt-5 h-px w-12 bg-line" />
        </div>

        <form
          action={formAction}
          className="space-y-5 rounded-3xl border border-line bg-cream-50/80 p-8 shadow-[0_24px_60px_-30px_rgba(60,45,30,0.35)] backdrop-blur sm:p-10"
        >
          <input type="hidden" name="next" value={next} />

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-gray"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@exemplo.com"
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray-light focus:border-gold focus:ring-4 focus:ring-gold/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-gray"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray-light focus:border-gold focus:ring-4 focus:ring-gold/10"
            />
          </div>

          {state && !state.ok && (
            <p className="rounded-xl border border-rose-300/60 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs tracking-wide text-warm-gray-light">
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
