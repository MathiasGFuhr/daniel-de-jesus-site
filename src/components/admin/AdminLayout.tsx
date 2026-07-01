"use client";

import { useState, type ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminThemeProvider, useAdminTheme } from "@/lib/admin-theme";

export function AdminLayout({
  userName,
  siteName,
  siteSlug,
  children,
}: {
  userName: string;
  siteName: string;
  siteSlug: string;
  children: ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <AdminShell userName={userName} siteName={siteName} siteSlug={siteSlug}>
        {children}
      </AdminShell>
    </AdminThemeProvider>
  );
}

function AdminShell({
  userName,
  siteName,
  siteSlug,
  children,
}: {
  userName: string;
  siteName: string;
  siteSlug: string;
  children: ReactNode;
}) {
  const { theme, mounted } = useAdminTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = mounted && theme === "dark";

  return (
    <div
      className={`admin-panel min-h-screen bg-slate-50 admin-dark:bg-slate-950 ${isDark ? "dark" : ""}`}
      suppressHydrationWarning
    >
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-slate-900 lg:block">
        <AdminSidebar siteName={siteName} />
      </aside>

      {/* Sidebar mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-slate-900/40 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-64 bg-slate-900 shadow-xl transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar siteName={siteName} onNavigate={() => setMenuOpen(false)} />
        </aside>
      </div>

      <div className="lg:pl-64">
        <AdminHeader
          userName={userName}
          siteSlug={siteSlug}
          onOpenMenu={() => setMenuOpen(true)}
        />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
