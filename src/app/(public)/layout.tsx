import { AppShell } from "@/components/AppShell";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";
import {
  getSiteSettings,
  getSocialLinks,
  getContactSettings,
  getSongs,
} from "@/lib/data";
import type { ShellData } from "@/lib/public-nav";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [site, socials, contact, songs] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(true),
    getContactSettings(),
    getSongs(true),
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
    featured?.spotifyUrl || spotifySocial?.url || "/spotify";

  const data: ShellData = {
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

  return <AppShell data={data}>{children}</AppShell>;
}
