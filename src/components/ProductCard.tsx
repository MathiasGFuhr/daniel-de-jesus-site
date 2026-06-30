import Image from "next/image";
import { Tag } from "./ui";
import { ArrowUpRightIcon } from "./Icons";

export interface ProductData {
  id: string;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  url: string;
  type: string;
  tag?: string | null;
  description: string;
}

function tagTone(tag: string): "neutral" | "gold" | "official" {
  if (tag === "Produto oficial") return "official";
  if (tag === "Afiliado") return "gold";
  return "neutral";
}

export function ProductCard({ product }: { product: ProductData }) {
  const tag = product.tag || product.type;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream-50 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-beige">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {tag && (
          <div className="absolute left-3 top-3">
            <Tag tone={tagTone(tag)}>{tag}</Tag>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
          {product.category}
        </span>
        <h3 className="mt-1 font-display text-lg leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-warm-gray">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="font-display text-lg text-ink">{product.price}</span>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-gold hover:text-coal"
          >
            Comprar
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
