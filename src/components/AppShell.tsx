"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileMenu } from "./MobileMenu";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import type { ShellData } from "@/lib/public-nav";

export function AppShell({
  data,
  children,
}: {
  data: ShellData;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar data={data} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} data={data} />

      <div className="lg:pl-64">
        <AnnouncementBar data={data.announcement} />
        <Header data={data} onOpenMenu={() => setMenuOpen(true)} />
        <main className="min-h-[60vh]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer data={data} />
      </div>
    </div>
  );
}
