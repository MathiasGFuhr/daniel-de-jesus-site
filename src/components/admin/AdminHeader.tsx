"use client";

import { logoutAction } from "@/lib/actions/auth";

export function AdminHeader({
  userName,
  siteSlug,
  onOpenMenu,
}: {
  userName: string;
  siteSlug: string;
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <a
          href={`/${siteSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Visualizar site
        </a>
        <span className="hidden text-sm text-slate-500 sm:inline">{userName}</span>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}
