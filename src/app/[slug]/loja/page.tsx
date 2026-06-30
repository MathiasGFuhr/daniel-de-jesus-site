import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { ProductGrid } from "@/components/ProductGrid";
import { getSiteBySlug, getProducts, getContactSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Loja",
  description: "Produtos oficiais e afiliados recomendados.",
};

export default async function LojaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();

  const [products, contact] = await Promise.all([
    getProducts(tenant.id, true),
    getContactSettings(tenant.id),
  ]);

  return (
    <Section>
      <SectionHeading
        eyebrow="Loja / Produtos"
        title="Loja oficial"
        description="Produtos oficiais do artista e recomendações de áudio e estúdio para ouvir e criar música com qualidade."
      />
      <ProductGrid
        products={products}
        affiliateDisclaimer={contact.affiliateDisclaimer}
      />
    </Section>
  );
}
