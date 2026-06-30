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
import { SONG_TYPES } from "@/lib/defaults";
import { saveSong, deleteSong, toggleSong, featureSong } from "@/lib/actions/songs";

interface Item {
  id: string;
  title: string;
  type: string;
  year: string;
  releaseDate: string | null;
  coverUrl: string;
  description: string;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  deezerUrl: string | null;
  appleMusicUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
}

export function SongManager({ items }: { items: Item[] }) {
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
          + Adicionar música
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{item.type}</span>
                  {item.isFeatured && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700">Destaque</span>
                  )}
                  {!item.isActive && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">Inativo</span>
                  )}
                </div>
                <h3 className="mt-1.5 truncate font-medium text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.year}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setEditing(item); setOpen(true); }}
                className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Editar
              </button>
              <RowButton onClick={() => toggleSong(item.id)}>{item.isActive ? "Desativar" : "Ativar"}</RowButton>
              <RowButton onClick={() => featureSong(item.id)}>Destacar</RowButton>
              <DeleteButton onConfirm={() => deleteSong(item.id)} title="Excluir música?" />
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Editar música" : "Nova música"}>
        <EntityForm action={saveSong} onSuccess={() => setOpen(false)}>
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Título" name="title" required defaultValue={editing?.title ?? ""} />
            <SelectInput label="Tipo" name="type" options={SONG_TYPES} defaultValue={editing?.type ?? "Single"} />
            <TextInput label="Ano" name="year" defaultValue={editing?.year ?? ""} />
            <TextInput label="Data de lançamento" name="releaseDate" type="date" defaultValue={editing?.releaseDate ?? ""} />
          </div>
          <ImageUpload label="Capa" name="coverUrl" defaultValue={editing?.coverUrl ?? ""} />
          <TextArea label="Descrição" name="description" defaultValue={editing?.description ?? ""} rows={2} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Link Spotify" name="spotifyUrl" defaultValue={editing?.spotifyUrl ?? ""} />
            <TextInput label="Link YouTube" name="youtubeUrl" defaultValue={editing?.youtubeUrl ?? ""} />
            <TextInput label="Link Deezer" name="deezerUrl" defaultValue={editing?.deezerUrl ?? ""} />
            <TextInput label="Link Apple Music" name="appleMusicUrl" defaultValue={editing?.appleMusicUrl ?? ""} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleSwitch name="isActive" label="Ativa" defaultChecked={editing?.isActive ?? true} />
            <ToggleSwitch name="isFeatured" label="Lançamento principal" defaultChecked={editing?.isFeatured ?? false} />
          </div>
        </EntityForm>
      </Modal>
    </div>
  );
}
