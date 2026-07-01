"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavGlyph, DynamicIcon } from "./Icons";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { usePublicI18n } from "./PublicI18nProvider";
import { navHref, type ShellData } from "@/lib/public-nav";

function isActive(pathname: string, full: string, isHome: boolean) {
  if (isHome) return pathname === full;
  return pathname === full || pathname.startsWith(`${full}/`);
}

function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export function Sidebar({ data }: { data: ShellData }) {
  const pathname = usePathname();
  const { t } = usePublicI18n();
  const [first, rest] = splitName(data.artistName);
  const platformLinks = data.socials.filter((l) =>
    ["spotify", "youtube", "apple", "deezer", "soundcloud"].includes(l.icon),
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-coal text-cream-100 lg:flex">
      <div className="px-7 pt-8 pb-6">
        <Link href={data.basePath} className="block leading-none">
          <span className="font-display text-xl uppercase tracking-[0.18em]">
            {first}
          </span>
          {rest && (
            <span className="font-display text-xl uppercase tracking-[0.18em] text-gold-soft">
              {rest}
            </span>
          )}
        </Link>
        <div className="mt-5 h-px w-12 bg-gold/40" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4">
        {data.nav.map((item) => {
          const full = navHref(data.basePath, item.href);
          const active = isActive(pathname, full, item.href === "");
          return (
            <Link
              key={item.href}
              href={full}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-white/[0.06] text-cream"
                  : "text-cream-100/60 hover:bg-white/[0.04] hover:text-cream"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gold-soft" />
              )}
              <NavGlyph
                name={item.icon}
                className={`h-[18px] w-[18px] ${
                  active ? "text-gold-soft" : "text-cream-100/50 group-hover:text-cream"
                }`}
              />
              <span className="tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {platformLinks.length > 0 && (
        <div className="px-7 pb-4 pt-6">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-cream-100/40">
            {t("sidebar.listenNow")}
          </p>
          <div className="flex items-center gap-2.5">
            {platformLinks.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-cream-100/70 transition-colors hover:border-gold-soft/60 hover:text-gold-soft"
              >
                <DynamicIcon name={l.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="px-7 pb-4">
        <LocaleSwitcher locale={data.locale} slug={data.slug} variant="dark" />
      </div>

      <div className="border-t border-white/[0.06] px-7 py-5 text-[11px] leading-relaxed text-cream-100/40">
        <p>{data.footer.copyright}</p>
        <p>{data.footer.rights}</p>
      </div>
    </aside>
  );
}
