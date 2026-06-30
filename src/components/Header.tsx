"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicIcon, MenuIcon, SearchIcon } from "./Icons";
import { SearchOverlay } from "./SearchOverlay";
import { PUBLIC_NAV, type ShellData } from "@/lib/public-nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({
  data,
  onOpenMenu,
}: {
  data: ShellData;
  onOpenMenu: () => void;
}) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const socials = data.socials.filter((l) =>
    ["instagram", "tiktok", "youtube", "spotify"].includes(l.icon),
  );

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-cream/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-beige/60 lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        <Link href="/" className="leading-none lg:hidden">
          <span className="font-display text-lg uppercase tracking-[0.16em]">
            {data.artistName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {PUBLIC_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-[13px] uppercase tracking-[0.1em] transition-colors ${
                  active ? "text-ink" : "text-warm-gray hover:text-ink"
                }`}
              >
                {item.label}
                {active && <span className="absolute inset-x-3 -bottom-px h-px bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-beige/60"
          >
            <SearchIcon className="h-[18px] w-[18px]" />
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {socials.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-warm-gray transition-colors hover:bg-beige/60 hover:text-ink"
              >
                <DynamicIcon name={l.icon} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
