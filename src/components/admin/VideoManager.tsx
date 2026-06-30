"use client";

import { useState } from "react";
import { Modal } from "./ConfirmDialog";
import { EntityForm } from "./EntityForm";
import { DeleteButton } from "./DeleteButton";
import { RowButton } from "./RowButton";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { SelectInput } from "./SelectInput";
import { ToggleSwitch } from "./ToggleSwitch";
import { ImageUpload } from "./ImageUpload";
import { VIDEO_TYPES } from "@/lib/defaults";
import { saveVideo, deleteVideo, toggleVideo, featureVideo } from "@/lib/actions/videos";

interface Item {
  id: string;
  title: string;
  type: string;
  description: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  thumbnailUrl: string;
  publishedAt: string | null;
  isActive: boolean;
  isFeatured: boolean;
}

export function VideoManager({ items }: { items: Item[] }) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => { setEditing(null); setOpen(true); }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Adicionar vídeo
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{item.type}</span>
              {item.isFeatured && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700">Destaque</span>}
              {!item.isActive && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">Inativo</span>}
            </div>
            <h3 className="mt-1.5 truncate font-medium text-slate-900">{item.title}</h3>
            <p className="truncate text-xs text-slate-500">{item.youtubeUrl}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setEditing(item); setOpen(true); }}
                className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Editar
              </button>
              <RowButton onClick={() => toggleVideo(item.id)}>{item.isActive ? "Desativar" : "Ativar"}</RowButton>
              <RowButton onClick={() => featureVideo(item.id)}>Destacar</RowButton>
              <DeleteButton onConfirm={() => deleteVideo(item.id)} title="Excluir vídeo?" />
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Editar vídeo" : "Novo vídeo"}>
        <EntityForm action={saveVideo} onSuccess={() => setOpen(false)}>
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Título" name="title" required defaultValue={editing?.title ?? ""} />
            <SelectInput label="Tipo" name="type" options={VIDEO_TYPES} defaultValue={editing?.type ?? "Clipe oficial"} />
          </div>
          <TextArea label="Descrição" name="description" defaultValue={editing?.description ?? ""} rows={2} />
          <TextInput label="URL do YouTube" name="youtubeUrl" required defaultValue={editing?.youtubeUrl ?? ""} placeholder="https://youtube.com/watch?v=..." />
          <TextInput label="URL embed (opcional)" name="youtubeEmbedUrl" defaultValue={editing?.youtubeEmbedUrl ?? ""} hint="Deixe em branco para gerar automaticamente." />
          <ImageUpload label="Thumbnail" name="thumbnailUrl" defaultValue={editing?.thumbnailUrl ?? ""} />
          <TextInput label="Data de publicação" name="publishedAt" type="date" defaultValue={editing?.publishedAt ?? ""} />
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleSwitch name="isActive" label="Ativo" defaultChecked={editing?.isActive ?? true} />
            <ToggleSwitch name="isFeatured" label="Vídeo em destaque" defaultChecked={editing?.isFeatured ?? false} />
          </div>
        </EntityForm>
      </Modal>
    </div>
  );
}
