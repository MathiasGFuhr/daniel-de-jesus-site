import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui";
import { getHomeContent, getSiteSettings, getSocialLinks } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return { title: "Sobre", description: site.description };
}

export default async function SobrePage() {
  const [home, site, socials] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
    getSocialLinks(true),
  ]);

  const bioParagraphs = home.bioFull.split("\n").filter((p) => p.trim());
  const aboutImage = home.aboutImageUrl || home.imageUrl;
  const facts = [
    home.aboutGenre && { label: "Gênero musical", value: home.aboutGenre },
    home.aboutYear && { label: "Ano de estreia", value: home.aboutYear },
    {
      label: "Plataformas",
      value: socials.map((s) => s.label).slice(0, 4).join(", ") || "—",
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-line bg-beige shadow-[0_30px_60px_-30px_rgba(27,24,19,0.45)] lg:sticky lg:top-24">
          {aboutImage && (
            <Image
              src={aboutImage}
              alt={site.artistName}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          )}
        </div>

        <div>
          <Eyebrow>{site.artistLabel}</Eyebrow>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-ink">
            Sobre {site.artistName}
          </h1>
          <p className="mt-5 font-display text-xl italic leading-relaxed text-ink-soft">
            {home.bioShort}
          </p>

          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-warm-gray">
            {bioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-line bg-cream-50 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {fact.label}
                </p>
                <p className="mt-1.5 font-display text-lg text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
