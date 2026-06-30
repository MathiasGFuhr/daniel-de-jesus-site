import Link from "next/link";
import { ArrowRightIcon, DynamicIcon } from "./Icons";
import { PUBLIC_NAV, type ShellData } from "@/lib/public-nav";

function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export function Footer({ data }: { data: ShellData }) {
  const [first, rest] = splitName(data.artistName);
  const spotify = data.socials.find((s) => s.icon === "spotify");
  const half = Math.ceil(PUBLIC_NAV.length / 2);
  const navCols = [PUBLIC_NAV.slice(0, half), PUBLIC_NAV.slice(half)];

  return (
    <footer className="mt-24 border-t border-line bg-cream-100">
      {/* Faixa de destaque */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Acompanhe de perto
            </p>
            <p className="mt-3 font-display text-2xl leading-snug text-ink sm:text-3xl">
              Ouça os lançamentos e fique por dentro das novidades.
            </p>
          </div>
          {spotify && (
            <a
              href={spotify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-gold"
            >
              Ouça no Spotify
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          {/* Marca */}
          <div>
            <Link
              href="/"
              className="font-display text-3xl uppercase tracking-[0.16em] text-ink"
            >
              {first} <span className="text-gold">{rest}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-warm-gray">
              {data.footer.text}
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              {data.socials.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-warm-gray transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <DynamicIcon name={l.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação (2 colunas) */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
              Navegação
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-warm-gray">
              {navCols.map((col, i) => (
                <ul key={i} className="space-y-3">
                  {col.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
              Contato
            </h4>
            <a
              href={`mailto:${data.footer.email}`}
              className="block break-words text-sm text-warm-gray transition-colors hover:text-ink"
            >
              {data.footer.email}
            </a>
            <Link
              href="/contato"
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:underline"
            >
              Fale comigo
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-xs text-warm-gray-light sm:flex-row sm:items-center sm:justify-between">
          <p>
            {data.footer.copyright} — {data.footer.rights}
          </p>
          <p className="tracking-wide">
            Feito com cuidado · {first} {rest}
          </p>
        </div>
      </div>
    </footer>
  );
}
