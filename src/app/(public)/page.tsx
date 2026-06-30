import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedVideo } from "@/components/FeaturedVideo";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { OfficialLinks } from "@/components/OfficialLinks";
import { ProductGrid } from "@/components/ProductGrid";
import { Section, SectionHeading } from "@/components/ui";
import { ArrowRightIcon } from "@/components/Icons";
import {
  getHomeContent,
  getSiteSettings,
  getSpotifySettings,
  getSocialLinks,
  getProducts,
  getVideos,
  getContactSettings,
} from "@/lib/data";

export default async function HomePage() {
  const [home, site, spotify, socials, products, videos, contact] =
    await Promise.all([
      getHomeContent(),
      getSiteSettings(),
      getSpotifySettings(),
      getSocialLinks(true),
      getProducts(true),
      getVideos(true),
      getContactSettings(),
    ]);

  const featuredVideo = videos.find((v) => v.isFeatured) ?? videos[0];

  return (
    <>
      {home.showHero && (
        <HeroSection home={home} artistLabel={site.artistLabel} />
      )}

      {(home.showFeaturedVideo || home.showSpotify) && (
        <Section>
          <div className="grid gap-6 lg:grid-cols-2">
            {home.showFeaturedVideo && featuredVideo && (
              <div>
                <SectionHeading eyebrow="Vídeo em destaque" title={featuredVideo.title} />
                <FeaturedVideo
                  video={{
                    title: featuredVideo.title,
                    subtitle: "Último lançamento",
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
                <SectionHeading eyebrow="Ouça no Spotify" title="Último EP" />
                <SpotifyEmbed spotify={spotify} />
              </div>
            )}
          </div>
        </Section>
      )}

      {home.showOfficialLinks && socials.length > 0 && (
        <Section className="bg-cream-100/60">
          <SectionHeading
            eyebrow="Onde encontrar"
            title="Links oficiais"
            description={`Siga ${site.artistName} nas plataformas e acompanhe os lançamentos.`}
            action={
              <Link
                href="/links"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-gold"
              >
                Ver todos
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            }
          />
          <OfficialLinks links={socials} />
        </Section>
      )}

      {home.showProducts && products.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Loja / Produtos"
            title="Loja oficial"
            description="Produtos oficiais e recomendações para ouvir e criar música com qualidade."
            action={
              <Link
                href="/loja"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-gold"
              >
                Ver todos os produtos
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
