"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth";
import type { ActionState } from "@/lib/actions/helpers";

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    registerAction,
    null,
  );
  const [artistName, setArtistName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const effectiveSlug = slugTouched ? slugify(slug) : slugify(artistName);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-beige/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Criar conta
          </span>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Crie a página do seu cantor
          </h1>
          <p className="mt-3 text-sm text-warm-gray">
            Monte um site completo e gerencie tudo pelo painel.
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-3xl border border-line bg-cream-50/80 p-8 shadow-[0_24px_60px_-30px_rgba(60,45,30,0.35)] backdrop-blur sm:p-9"
        >
          <Field
            label="Seu nome"
            name="name"
            type="text"
            placeholder="Como devemos te chamar"
            autoComplete="name"
          />

          <Field
            label="E-mail"
            name="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            error={state?.fieldErrors?.email}
          />

          <Field
            label="Senha"
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
          />

          <div>
            <label
              htmlFor="artistName"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-gray"
            >
              Nome do cantor
            </label>
            <input
              id="artistName"
              name="artistName"
              type="text"
              required
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Ex.: Maria Voz"
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray-light focus:border-gold focus:ring-4 focus:ring-gold/10"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-gray"
            >
              Endereço público
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={slugTouched ? slug : effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              placeholder="maria-voz"
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray-light focus:border-gold focus:ring-4 focus:ring-gold/10"
            />
            <p className="mt-2 text-xs text-warm-gray-light">
              Sua página ficará em <span className="font-medium text-warm-gray">/{effectiveSlug || "seu-cantor"}</span>
            </p>
            {state?.fieldErrors?.slug && (
              <p className="mt-1 text-xs text-rose-600">{state.fieldErrors.slug}</p>
            )}
          </div>

          {state && !state.ok && (
            <p className="rounded-xl border border-rose-300/60 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Criando…" : "Criar minha conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-warm-gray">
          Já tem conta?{" "}
          <Link href="/admin/login" className="font-medium text-ink underline underline-offset-4 hover:text-gold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-gray"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray-light focus:border-gold focus:ring-4 focus:ring-gold/10"
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
