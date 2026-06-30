import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts, getContactSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Loja",
  description: "Produtos oficiais e afiliados recomendados.",
};

export default async function LojaPage() {
  const [products, contact] = await Promise.all([
    getProducts(true),
    getContactSettings(),
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
