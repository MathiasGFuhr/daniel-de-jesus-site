"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PUBLIC_NAV } from "@/lib/public-nav";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "./Icons";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PUBLIC_NAV;
    return PUBLIC_NAV.filter((n) => n.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function go(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-cream shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <SearchIcon className="h-5 w-5 text-warm-gray" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar páginas, músicas, loja..."
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-warm-gray-light"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar busca"
            className="rounded-lg p-1 text-warm-gray hover:bg-beige/60 hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-warm-gray">
              Nenhum resultado encontrado.
            </li>
          )}
          {results.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => go(item.href)}
                className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-ink-soft transition-colors hover:bg-beige/50"
              >
                <span>{item.label}</span>
                <ArrowRightIcon className="h-4 w-4 text-warm-gray-light transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
