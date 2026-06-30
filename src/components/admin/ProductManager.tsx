"use client";

import { useState, useRef } from "react";
import { Modal } from "./ConfirmDialog";
import { EntityForm } from "./EntityForm";
import { DeleteButton } from "./DeleteButton";
import { RowButton } from "./RowButton";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { SelectInput } from "./SelectInput";
import { ToggleSwitch } from "./ToggleSwitch";
import { ImageUpload } from "./ImageUpload";
import { PreviewCard } from "./PreviewCard";
import { PRODUCT_TYPES, PRODUCT_TAGS } from "@/lib/defaults";
import { saveProduct, deleteProduct, toggleProduct, moveProduct } from "@/lib/actions/products";

interface Item {
  id: string;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  url: string;
  type: string;
  tag: string | null;
  description: string;
  isActive: boolean;
  order: number;
}

function Editor({ editing, onSuccess }: { editing: Item | null; onSuccess: () => void }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [price, setPrice] = useState(editing?.price ?? "");
  const [category, setCategory] = useState(editing?.category ?? "");
  const [imageUrl, setImageUrl] = useState(editing?.imageUrl ?? "");
  const [tag, setTag] = useState(editing?.tag ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <EntityForm action={saveProduct} onSuccess={onSuccess}>
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <input type="hidden" name="order" value={editing?.order ?? 0} />
        <input type="hidden" name="imageUrl" value={imageUrl} />
        <TextInput label="Nome" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Categoria" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <TextInput label="Preço" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="R$ 0,00" />
          <SelectInput label="Tipo" name="type" options={PRODUCT_TYPES} defaultValue={editing?.type ?? "Afiliado"} />
          <SelectInput label="Tag" name="tag" options={["", ...PRODUCT_TAGS]} value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <TextArea label="Descrição curta" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        <TextInput label="Link de compra" name="url" required defaultValue={editing?.url ?? ""} placeholder="https://..." />
        <ToggleSwitch name="isActive" label="Ativo" defaultChecked={editing?.isActive ?? true} />
        <div className="pt-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Imagem do produto</span>
          <ImageUploadMirror value={imageUrl} onChange={setImageUrl} />
        </div>
      </EntityForm>

      <PreviewCard name={name} price={price} category={category} imageUrl={imageUrl} tag={tag} description={description} />
    </div>
  );
}

// Wrapper para sincronizar o ImageUpload com o estado da prévia.
function ImageUploadMirror({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <InlineImageUpload value={value} onChange={onChange} />;
}

function InlineImageUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function handle(file: File) {
    setError(""); setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Falha no upload");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro no upload");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => ref.current?.click()} disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">
          {loading ? "Enviando..." : "Enviar imagem"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="rounded-lg px-2 py-1.5 text-sm text-rose-500 hover:bg-rose-50">
            Remover
          </button>
        )}
      </div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="ou cole uma URL"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-700 outline-none focus:border-slate-900" />
      {error && <p className="text-xs text-rose-500">{error}</p>}
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }} />
    </div>
  );
}

export function ProductManager({ items, disclaimer }: { items: Item[]; disclaimer: string }) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={() => { setEditing(null); setOpen(true); }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Adicionar produto
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">Nenhum produto cadastrado.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  {item.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.price} · {item.type}</p>
                </div>
                {!item.isActive && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">Inativo</span>}
                <RowButton onClick={() => moveProduct(item.id, "up")} className={i === 0 ? "opacity-30" : ""}>↑</RowButton>
                <RowButton onClick={() => moveProduct(item.id, "down")} className={i === items.length - 1 ? "opacity-30" : ""}>↓</RowButton>
                <RowButton onClick={() => toggleProduct(item.id)}>{item.isActive ? "Desativar" : "Ativar"}</RowButton>
                <button type="button" onClick={() => { setEditing(item); setOpen(true); }}
                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  Editar
                </button>
                <DeleteButton onConfirm={() => deleteProduct(item.id)} title="Excluir produto?" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 text-xs italic text-slate-400">{disclaimer}</p>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Editar produto" : "Novo produto"}>
        {open && <Editor editing={editing} onSuccess={() => setOpen(false)} />}
      </Modal>
    </div>
  );
}
