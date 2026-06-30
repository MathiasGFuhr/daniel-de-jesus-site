"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ADMIN_NAV = [
  { label: "Visão geral", href: "/admin", icon: "grid" },
  { label: "Site", href: "/admin/site", icon: "globe" },
  { label: "Home", href: "/admin/home", icon: "home" },
  { label: "Sobre", href: "/admin/sobre", icon: "user" },
  { label: "Aparência", href: "/admin/aparencia", icon: "palette" },
  { label: "Redes sociais", href: "/admin/redes", icon: "share" },
  { label: "Músicas", href: "/admin/musicas", icon: "music" },
  { label: "Vídeos", href: "/admin/videos", icon: "video" },
  { label: "Spotify", href: "/admin/spotify", icon: "spotify" },
  { label: "Produtos", href: "/admin/produtos", icon: "bag" },
  { label: "Links", href: "/admin/links", icon: "link" },
  { label: "Contato", href: "/admin/contato", icon: "mail" },
  { label: "Configurações", href: "/admin/configuracoes", icon: "gear" },
];

const icons: Record<string, React.ReactNode> = {
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  home: <path d="M3 11l9-8 9 8M5 9v11h14V9" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  palette: <><circle cx="12" cy="12" r="9" /><circle cx="8" cy="10" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="16" cy="10" r="1" /></>,
  share: <><circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 11l8-4M8 13l8 4" /></>,
  music: <><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
  video: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></>,
  spotify: <><circle cx="12" cy="12" r="9" /><path d="M7 10c3-1 7-.5 10 1M8 13c2.5-.7 5-.4 7 1" /></>,
  bag: <><path d="M5 8h14l-1 12H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
};

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex h-full flex-col">
      <div className="px-6 py-5">
        <Link href="/admin" onClick={onNavigate} className="block leading-tight">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Painel</span>
          <span className="block font-semibold text-white">Daniel de Jesus</span>
        </Link>
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {ADMIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-white/10 font-medium text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={active ? "text-white" : "text-slate-400"}
              >
                {icons[item.icon]}
              </svg>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
