import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";
import { buildThemeCss } from "@/lib/theme-css";
import {
  getSiteBySlug,
  getSiteSettings,
  getThemeSettings,
  getAdvancedSettings,
  getSocialLinks,
  getContactSettings,
  getSongs,
} from "@/lib/data";
import type { ShellData } from "@/lib/public-nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) return { title: "Página não encontrada" };
  const site = await getSiteSettings(tenant.id);
  return {
    title: {
      default: `${site.artistName} — ${site.artistLabel}`,
      template: `%s — ${site.artistName}`,
    },
    description: site.description,
    icons: site.faviconUrl ? { icon: site.faviconUrl } : undefined,
    openGraph: {
      title: `${site.artistName} — ${site.artistLabel}`,
      description: site.description,
      type: "website",
    },
  };
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();

  const basePath = `/${tenant.slug}`;

  const [site, theme, advanced, socials, contact, songs] = await Promise.all([
    getSiteSettings(tenant.id),
    getThemeSettings(tenant.id),
    getAdvancedSettings(tenant.id),
    getSocialLinks(tenant.id, true),
    getContactSettings(tenant.id),
    getSongs(tenant.id, true),
  ]);

  if (site.maintenanceMode) {
    return <MaintenanceScreen title="Site em manutenção" message="Estamos preparando novidades. Volte em breve." artistName={site.artistName} />;
  }
  if (!site.isPublished) {
    return <MaintenanceScreen title="Em breve" message="Este site ainda não foi publicado." artistName={site.artistName} />;
  }

  const featured = songs.find((s) => s.isFeatured) ?? songs[0];

  const spotifySocial = socials.find((s) => s.icon === "spotify");
  const announcementCta =
    featured?.spotifyUrl || spotifySocial?.url || `${basePath}/spotify`;

  const data: ShellData = {
    basePath,
    artistName: site.artistName,
    artistLabel: site.artistLabel,
    socials: socials.map((s) => ({
      label: s.label,
      url: s.url,
      icon: s.icon,
      handle: s.handle,
    })),
    announcement: {
      enabled: Boolean(featured),
      badge: "Novo lançamento",
      text: featured
        ? `“${featured.title}” já disponível em todas as plataformas!`
        : "",
      ctaLabel: "Ouça agora",
      ctaUrl: announcementCta,
    },
    footer: {
      text: site.footerText,
      email: contact.email,
      copyright: site.copyrightText,
      rights: "Todos os direitos reservados.",
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: buildThemeCss(theme) }} />
      {advanced.customHeadCode ? (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: advanced.customHeadCode }} />
      ) : null}
      <AppShell data={data}>{children}</AppShell>
      {advanced.customFooterCode ? (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: advanced.customFooterCode }} />
      ) : null}
    </>
  );
}
