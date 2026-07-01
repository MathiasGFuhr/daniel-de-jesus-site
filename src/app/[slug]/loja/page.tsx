import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { ProductGrid } from "@/components/ProductGrid";
import { getPublicI18n } from "@/lib/i18n";
import { getSiteBySlug, getProducts, getContactSettings } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getPublicI18n();
  return { title: t("meta.store"), description: t("meta.storeDesc") };
}

export default async function LojaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const { t } = await getPublicI18n();

  const [products, contact] = await Promise.all([
    getProducts(tenant.id, true),
    getContactSettings(tenant.id),
  ]);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("store.eyebrow")}
        title={t("store.title")}
        description={t("store.description")}
      />
      <ProductGrid
        products={products}
        affiliateDisclaimer={contact.affiliateDisclaimer}
      />
    </Section>
  );
}
