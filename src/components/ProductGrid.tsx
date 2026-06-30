import { ProductCard, type ProductData } from "./ProductCard";

export function ProductGrid({
  products,
  affiliateDisclaimer,
  showDisclaimer = true,
}: {
  products: ProductData[];
  affiliateDisclaimer?: string;
  showDisclaimer?: boolean;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {showDisclaimer && affiliateDisclaimer && (
        <p className="mt-6 text-xs italic text-warm-gray-light">
          {affiliateDisclaimer}
        </p>
      )}
    </div>
  );
}
