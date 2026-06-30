import Link from "next/link";
import Image from "next/image";
import { Container } from "./ui";
import { ArrowRightIcon, LinkIcon, PlayIcon, SpotifyIcon } from "./Icons";
import { resolvePublicHref } from "@/lib/public-nav";

export interface HeroData {
  eyebrow: string;
  title: string;
  slogan: string;
  description: string;
  imageUrl: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  thirdButtonLabel: string;
  thirdButtonUrl: string;
}

function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export function HeroSection({
  home,
  artistLabel,
  basePath,
}: {
  home: HeroData;
  artistLabel: string;
  basePath: string;
}) {
  const [first, rest] = splitName(home.title);

  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      {/* Imagem de fundo (full-bleed) */}
      <div className="absolute inset-0 lg:left-[34%]">
        {home.imageUrl && (
          <Image
            src={home.imageUrl}
            alt={home.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        )}
        {/* Degradê para legibilidade do texto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-cream/20 lg:via-cream/60 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/60 via-transparent to-transparent lg:from-cream/10" />
      </div>

      <Container className="relative z-10 flex min-h-[78vh] items-center py-16 lg:min-h-[86vh]">
        <div className="animate-fade-up max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">
            {home.eyebrow || artistLabel}
          </span>
          <h1 className="mt-5 font-display text-7xl leading-[0.92] tracking-tight text-ink sm:text-8xl lg:text-9xl">
            {first}
            {rest && (
              <>
                <br />
                <span className="text-gold">{rest}</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-lg font-display text-2xl italic leading-relaxed text-ink-soft sm:text-3xl">
            {home.slogan}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={resolvePublicHref(basePath, home.primaryButtonUrl)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-ink-soft"
            >
              <SpotifyIcon className="h-4 w-4" />
              {home.primaryButtonLabel}
            </Link>
            <Link
              href={resolvePublicHref(basePath, home.secondaryButtonUrl)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/80 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur transition-colors hover:border-ink/40"
            >
              <PlayIcon className="h-3.5 w-3.5" />
              {home.secondaryButtonLabel}
            </Link>
            <Link
              href={resolvePublicHref(basePath, home.thirdButtonUrl)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-warm-gray transition-colors hover:text-ink"
            >
              <LinkIcon className="h-4 w-4" />
              {home.thirdButtonLabel}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
