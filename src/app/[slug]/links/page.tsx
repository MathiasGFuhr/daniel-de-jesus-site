import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicI18n } from "@/lib/i18n";
import { getSiteBySlug, getLinkPage, getLinkButtons, getSocialLinks } from "@/lib/data";
import { buildLinksPageItems } from "@/lib/links-page";
import { resolvePublicHref } from "@/lib/public-nav";
import { ArrowUpRightIcon, DynamicIcon } from "@/components/Icons";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getPublicI18n();
  return { title: t("meta.links"), description: t("meta.linksDesc") };
}

function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export default async function LinksPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const basePath = `/${tenant.slug}`;

  const [page, socials, buttons] = await Promise.all([
    getLinkPage(tenant.id),
    getSocialLinks(tenant.id, true),
    getLinkButtons(tenant.id, true),
  ]);
  const items = buildLinksPageItems(socials, buttons, true);
  const [first, rest] = splitName(page.title);

  return (
    <div className="mx-auto w-full max-w-md px-5 py-12">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gold/40 bg-beige shadow-lg">
          {page.avatarUrl && (
            <Image
              src={page.avatarUrl}
              alt={page.title}
              fill
              sizes="112px"
              className="object-cover"
            />
          )}
        </div>
        <h1 className="mt-5 font-display text-3xl uppercase tracking-[0.12em] text-ink">
          {first} <span className="text-gold">{rest}</span>
        </h1>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-warm-gray">
          {page.subtitle}
        </p>
      </div>

      <div className="mt-9 space-y-3">
        {items.map((btn) => {
          const internal = btn.url.startsWith("/");
          const href = resolvePublicHref(basePath, btn.url);
          return (
            <a
              key={btn.id}
              href={href}
              target={internal ? undefined : "_blank"}
              rel={internal ? undefined : "noopener noreferrer"}
              className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                btn.isPrimary
                  ? "border-gold/50 bg-gold/10"
                  : "border-line bg-cream-50 hover:border-gold/50"
              }`}
            >
              <DynamicIcon name={btn.icon} className="h-5 w-5 text-ink" />
              <span className="flex-1 text-left">
                <span className="block text-sm font-semibold text-ink">{btn.label}</span>
                {btn.subtitle && (
                  <span className="block text-xs text-warm-gray">{btn.subtitle}</span>
                )}
              </span>
              <ArrowUpRightIcon className="h-4 w-4 text-warm-gray-light transition-colors group-hover:text-gold" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
