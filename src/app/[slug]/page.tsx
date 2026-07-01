import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedVideo } from "@/components/FeaturedVideo";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { OfficialLinks } from "@/components/OfficialLinks";
import { ProductGrid } from "@/components/ProductGrid";
import { Section, SectionHeading } from "@/components/ui";
import { ArrowRightIcon } from "@/components/Icons";
import { getPublicI18n } from "@/lib/i18n";
import { localizeArtistLabel, localizeHome } from "@/lib/localize-content";
import { navHref } from "@/lib/public-nav";
import {
  getSiteBySlug,
  getHomeContent,
  getSiteSettings,
  getSpotifySettings,
  getSocialLinks,
  getProducts,
  getVideos,
  getContactSettings,
} from "@/lib/data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const { t, locale } = await getPublicI18n(slug);
  const basePath = `/${tenant.slug}`;

  const [home, site, spotify, socials, products, videos, contact] =
    await Promise.all([
      getHomeContent(tenant.id),
      getSiteSettings(tenant.id),
      getSpotifySettings(tenant.id),
      getSocialLinks(tenant.id, true),
      getProducts(tenant.id, true),
      getVideos(tenant.id, true),
      getContactSettings(tenant.id),
    ]);

  const featuredVideo = videos.find((v) => v.isFeatured) ?? videos[0];
  const hero = localizeHome(home, t, locale);
  const artistLabel = localizeArtistLabel(site.artistLabel, t, locale);

  return (
    <>
      {home.showHero && (
        <HeroSection home={hero} artistLabel={artistLabel} basePath={basePath} />
      )}

      {(home.showFeaturedVideo || home.showSpotify) && (
        <Section>
          <div className="grid gap-6 lg:grid-cols-2">
            {home.showFeaturedVideo && featuredVideo && (
              <div>
                <SectionHeading
                  eyebrow={t("home.featuredVideo")}
                  title={featuredVideo.title}
                />
                <FeaturedVideo
                  video={{
                    title: featuredVideo.title,
                    subtitle: t("home.latestRelease"),
                    releaseInfo: `${site.artistName}${featuredVideo.publishedAt ? ` • ${featuredVideo.publishedAt}` : ""}`,
                    youtubeEmbedUrl: featuredVideo.youtubeEmbedUrl,
                    youtubeUrl: featuredVideo.youtubeUrl,
                    thumbnail: featuredVideo.thumbnailUrl,
                  }}
                />
              </div>
            )}
            {home.showSpotify && spotify.isActive && (
              <div>
                <SectionHeading
                  eyebrow={t("home.listenSpotify")}
                  title={t("home.latestEp")}
                />
                <SpotifyEmbed spotify={spotify} />
              </div>
            )}
          </div>
        </Section>
      )}

      {home.showOfficialLinks && socials.length > 0 && (
        <Section className="bg-cream-100/40">
          <SectionHeading
            eyebrow={t("home.whereFind")}
            title={t("home.officialLinks")}
            description={t("home.followArtist", { artist: site.artistName })}
            action={
              <Link
                href={navHref(basePath, "/links")}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-50 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold/50 hover:text-gold"
              >
                {t("home.seeAll")}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <OfficialLinks links={socials} slug={tenant.slug} />
        </Section>
      )}

      {home.showProducts && products.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow={t("home.storeEyebrow")}
            title={t("home.officialStore")}
            description={t("home.storeDesc")}
            action={
              <Link
                href={navHref(basePath, "/loja")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-gold"
              >
                {t("home.seeAllProducts")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            }
          />
          <ProductGrid
            products={products.slice(0, 5)}
            affiliateDisclaimer={contact.affiliateDisclaimer}
          />
        </Section>
      )}
    </>
  );
}
