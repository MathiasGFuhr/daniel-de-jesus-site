import Link from "next/link";

export default function PlatformLanding() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-6 py-16 text-center">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-beige/50 blur-3xl" />

      <div className="relative max-w-2xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
          Plataforma para artistas
        </span>
        <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Crie o site do seu <span className="text-gold">cantor</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-warm-gray sm:text-lg">
          Monte uma página completa e elegante — músicas, vídeos, Spotify, loja e
          links — e gerencie tudo por um painel simples, sem escrever código.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/admin/register"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-gold"
          >
            Criar minha conta
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/70 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold/50"
          >
            Entrar
          </Link>
        </div>

        <p className="mt-10 text-xs tracking-wide text-warm-gray-light">
          Já tem uma página? Acesse pelo endereço do seu cantor: seudominio.com/seu-cantor
        </p>
      </div>
    </main>
  );
}
