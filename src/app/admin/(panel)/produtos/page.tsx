import { PageHeading } from "@/components/admin/AdminSection";
import { ProductManager } from "@/components/admin/ProductManager";
import { getProducts, getContactSettings } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";

export default async function ProdutosPage() {
  const site = await getCurrentSite();
  const [items, contact] = await Promise.all([
    getProducts(site.id),
    getContactSettings(site.id),
  ]);
  return (
    <>
      <PageHeading
        title="Produtos / Loja"
        description="Cadastre produtos próprios e links de afiliados exibidos na loja."
      />
      <ProductManager
        disclaimer={contact.affiliateDisclaimer}
        items={items.map((i) => ({
          id: i.id,
          name: i.name,
          category: i.category,
          price: i.price,
          imageUrl: i.imageUrl,
          url: i.url,
          type: i.type,
          tag: i.tag,
          description: i.description,
          isActive: i.isActive,
          order: i.order,
        }))}
      />
    </>
  );
}
