"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicIcon, CloseIcon, NavGlyph } from "./Icons";
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

export function MobileMenu({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: ShellData;
}) {
  const pathname = usePathname();
  const { t } = usePublicI18n();
  const [first, rest] = splitName(data.artistName);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-coal text-cream-100 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-5">
          <Link href={data.basePath} onClick={onClose} className="leading-none">
            <span className="block font-display text-xl uppercase tracking-[0.18em]">
              {first}
            </span>
            {rest && (
              <span className="block font-display text-xl uppercase tracking-[0.18em] text-gold-soft">
                {rest}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("a11y.closeMenu")}
            className="rounded-lg p-2 text-cream-100/70 hover:bg-white/10 hover:text-cream"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {data.nav.map((item) => {
            const full = navHref(data.basePath, item.href);
            const active = isActive(pathname, full, item.href === "");
            return (
              <Link
                key={item.href}
                href={full}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-white/[0.07] text-cream"
                    : "text-cream-100/65 hover:bg-white/[0.04] hover:text-cream"
                }`}
              >
                <NavGlyph
                  name={item.icon}
                  className={`h-[18px] w-[18px] ${active ? "text-gold-soft" : ""}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 pb-6 pt-4">
          <div className="flex items-center gap-2.5">
            {data.socials.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-100/70 hover:border-gold-soft/60 hover:text-gold-soft"
              >
                <DynamicIcon name={l.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
