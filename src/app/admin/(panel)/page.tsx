import Link from "next/link";
import { PageHeading } from "@/components/admin/AdminSection";
import { StatCard, AdminCard } from "@/components/admin/AdminCard";
import {
  getSiteSettings,
  getThemeSettings,
  getSpotifySettings,
  getProducts,
  getSocialLinks,
  getSongs,
  getVideos,
  getLinkButtons,
} from "@/lib/data";

const shortcuts = [
  { label: "Editar Home", href: "/admin/home" },
  { label: "Alterar vídeo", href: "/admin/videos" },
  { label: "Alterar Spotify", href: "/admin/spotify" },
  { label: "Adicionar produto", href: "/admin/produtos" },
  { label: "Alterar cores", href: "/admin/aparencia" },
  { label: "Editar links oficiais", href: "/admin/redes" },
];

export default async function AdminOverview() {
  const [site, theme, spotify, products, socials, songs, videos, buttons] =
    await Promise.all([
      getSiteSettings(),
      getThemeSettings(),
      getSpotifySettings(),
      getProducts(),
      getSocialLinks(),
      getSongs(),
      getVideos(),
      getLinkButtons(),
    ]);

  const featuredSong = songs.find((s) => s.isFeatured) ?? songs[0];
  const featuredVideo = videos.find((v) => v.isFeatured) ?? videos[0];
  const themeColors = [
    theme.primaryColor,
    theme.accentColor,
    theme.backgroundColor,
    theme.secondaryColor,
    theme.sidebarColor,
  ];

  const statusLabel = site.maintenanceMode
    ? "Em manutenção"
    : site.isPublished
      ? "Publicado"
      : "Despublicado";

  return (
    <>
      <PageHeading
        title="Visão geral"
        description="Resumo do site e atalhos rápidos para edição."
        action={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Visualizar site público
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Status do site" value={statusLabel} href="/admin/site" />
        <StatCard label="Nome do artista" value={site.artistName} href="/admin/site" />
        <StatCard
          label="Último lançamento"
          value={featuredSong?.title ?? "—"}
          hint={featuredSong?.year}
          href="/admin/musicas"
        />
        <StatCard label="Produtos cadastrados" value={products.length} href="/admin/produtos" />
        <StatCard label="Links oficiais" value={socials.length} href="/admin/redes" />
        <StatCard
          label="Vídeo em destaque"
          value={featuredVideo?.title ?? "—"}
          href="/admin/videos"
        />
        <StatCard
          label="Spotify"
          value={spotify.isActive ? "Conectado" : "Inativo"}
          hint={spotify.title}
          href="/admin/spotify"
        />
        <AdminCard>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Cores atuais
          </span>
          <div className="mt-3 flex gap-1.5">
            {themeColors.map((c, i) => (
              <span
                key={i}
                className="h-7 w-7 rounded-md border border-slate-200"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <Link
            href="/admin/aparencia"
            className="mt-3 inline-block text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Editar aparência →
          </Link>
        </AdminCard>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Atalhos rápidos
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              {s.label}
              <span className="text-slate-400">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/home" className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">
          Editar home
        </Link>
        <Link href="/admin/produtos" className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">
          Abrir loja
        </Link>
        <Link href="/admin/aparencia" className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">
          Editar aparência
        </Link>
        <span className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-400">
          {buttons.length} botões na página de links
        </span>
      </div>
    </>
  );
}
