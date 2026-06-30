"use client";

export function PreviewCard({
  name,
  price,
  category,
  imageUrl,
  tag,
  description,
}: {
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  tag?: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
        Prévia do card
      </span>
      <div className="mx-auto max-w-[200px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="relative aspect-square w-full bg-slate-100">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              Sem imagem
            </div>
          )}
          {tag && (
            <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
              {tag}
            </span>
          )}
        </div>
        <div className="p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700">
            {category || "Categoria"}
          </span>
          <h4 className="text-sm font-medium text-slate-900">{name || "Nome do produto"}</h4>
          <p className="line-clamp-2 text-[11px] text-slate-500">{description}</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{price || "R$ 0,00"}</p>
        </div>
      </div>
    </div>
  );
}
