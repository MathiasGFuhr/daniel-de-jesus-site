import "server-only";
import { prisma } from "./prisma";
import { defaultTheme } from "./defaults";

const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "login",
  "register",
  "cadastro",
  "sobre",
  "musicas",
  "videos",
  "spotify",
  "loja",
  "links",
  "contato",
  "static",
  "_next",
  "favicon.ico",
  "icon.svg",
  "robots.txt",
  "sitemap.xml",
]);

export function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug);
}

export async function isSlugAvailable(slug: string): Promise<boolean> {
  if (!slug || isReservedSlug(slug)) return false;
  const existing = await prisma.site.findUnique({ where: { slug } });
  return !existing;
}

const YEAR = new Date().getFullYear();

/**
 * Cria um novo site (cantor) com conteúdo inicial neutro, personalizado
 * com o nome do artista. Coleções (músicas, vídeos, produtos) começam vazias.
 */
export async function provisionSite(params: {
  ownerId: string;
  slug: string;
  artistName: string;
  ownerEmail: string;
}) {
  const { ownerId, slug, artistName, ownerEmail } = params;

  return prisma.site.create({
    data: {
      slug,
      ownerId,
      siteSettings: {
        create: {
          siteName: artistName,
          artistName,
          artistLabel: "Cantor e compositor",
          description: `Site oficial de ${artistName}.`,
          footerText: `Música e novidades de ${artistName}.`,
          aiDisclosureText: "",
          copyrightText: `© ${YEAR} ${artistName}`,
          logoUrl: "",
          faviconUrl: "",
          isPublished: true,
          maintenanceMode: false,
        },
      },
      themeSettings: { create: { ...defaultTheme } },
      homeContent: {
        create: {
          eyebrow: "Cantor e compositor",
          title: artistName,
          slogan: "Música que toca a alma.",
          description: "",
          imageUrl: "",
          primaryButtonLabel: "Ouça no Spotify",
          primaryButtonUrl: "/spotify",
          secondaryButtonLabel: "Assistir vídeo",
          secondaryButtonUrl: "/videos",
          thirdButtonLabel: "Ver links",
          thirdButtonUrl: "/links",
          showHero: true,
          showFeaturedVideo: true,
          showSpotify: true,
          showOfficialLinks: true,
          showProducts: true,
          showAbout: true,
          showContact: true,
          bioShort: "",
          bioFull: "",
          aboutImageUrl: "",
          aboutGenre: "",
          aboutYear: "",
        },
      },
      spotifySettings: {
        create: {
          title: "",
          artist: artistName,
          description: "",
          embedUrl: "",
          externalUrl: "",
          type: "EP",
          isActive: false,
        },
      },
      contactSettings: {
        create: {
          email: ownerEmail,
          headline: `Entre em contato com ${artistName}`,
          description: "Para parcerias, divulgação e projetos comerciais.",
          address: "",
          instagram: "",
          affiliateDisclaimer: "",
          contactTypes: JSON.stringify([
            "Parcerias",
            "Divulgação",
            "Imprensa",
            "Comercial",
            "Outros",
          ]),
        },
      },
      linkPage: {
        create: {
          avatarUrl: "",
          title: artistName,
          subtitle: "Cantor e compositor",
        },
      },
      advancedSettings: {
        create: {
          ownerName: artistName,
          ownerEmail,
          googleAnalyticsId: "",
          metaPixelId: "",
          tiktokPixelId: "",
          customHeadCode: "",
          customFooterCode: "",
        },
      },
    },
  });
}
