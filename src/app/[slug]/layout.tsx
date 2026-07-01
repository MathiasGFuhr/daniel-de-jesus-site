import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";
import { buildThemeCss } from "@/lib/theme-css";
import { getPublicI18n } from "@/lib/i18n";
import { buildPublicNav, type ShellData } from "@/lib/public-nav";
import {
  getSiteBySlug,
  getSiteSettings,
  getThemeSettings,
  getAdvancedSettings,
  getSocialLinks,
  getContactSettings,
  getSongs,
} from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  const { t } = await getPublicI18n();
  if (!tenant) return { title: t("meta.notFound") };
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

  const { locale, messages, t } = await getPublicI18n();
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
    return (
      <MaintenanceScreen
        title={t("maintenance.title")}
        message={t("maintenance.message")}
        artistName={site.artistName}
      />
    );
  }
  if (!site.isPublished) {
    return (
      <MaintenanceScreen
        title={t("maintenance.soonTitle")}
        message={t("maintenance.soonMessage")}
        artistName={site.artistName}
      />
    );
  }

  const featured = songs.find((s) => s.isFeatured) ?? songs[0];
  const spotifySocial = socials.find((s) => s.icon === "spotify");
  const announcementCta =
    featured?.spotifyUrl || spotifySocial?.url || `${basePath}/spotify`;

  const data: ShellData = {
    basePath,
    slug: tenant.slug,
    locale,
    nav: buildPublicNav(messages),
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
      badge: t("announcement.badge"),
      text: featured ? t("announcement.text", { title: featured.title }) : "",
      ctaLabel: t("announcement.cta"),
      ctaUrl: announcementCta,
    },
    footer: {
      text: site.footerText,
      email: contact.email,
      copyright: site.copyrightText,
      rights: t("footer.rights"),
      crafted: t("footer.crafted", { name: site.artistName }),
    },
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: buildThemeCss(theme) }} />
      {advanced.customHeadCode ? (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: advanced.customHeadCode }} />
      ) : null}
      <AppShell data={data} messages={messages}>
        {children}
      </AppShell>
      {advanced.customFooterCode ? (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: advanced.customFooterCode }} />
      ) : null}
    </>
  );
}
