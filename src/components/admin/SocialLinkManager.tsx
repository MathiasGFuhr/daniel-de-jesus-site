"use client";

import { useState } from "react";
import { Modal } from "./ConfirmDialog";
import { EntityForm } from "./EntityForm";
import { DeleteButton } from "./DeleteButton";
import { RowButton } from "./RowButton";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { ToggleSwitch } from "./ToggleSwitch";
import { DynamicIcon } from "@/components/Icons";
import { SOCIAL_PLATFORMS, guessSocialPlatform } from "@/lib/defaults";
import {
  saveSocialLink,
  deleteSocialLink,
  toggleSocialLink,
  moveSocialLink,
} from "@/lib/actions/social";

interface Item {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export function SocialLinkManager({ items }: { items: Item[] }) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  function startNew() {
    setEditing(null);
    setOpen(true);
  }
  function startEdit(item: Item) {
    setEditing(item);
    setOpen(true);
  }

  const platformOptions = SOCIAL_PLATFORMS.map((p) => ({
    value: p.value,
    label: p.label,
  }));

  const defaultPlatform = editing
    ? guessSocialPlatform(editing.icon, editing.label)
    : SOCIAL_PLATFORMS[0].value;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={startNew}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Adicionar rede
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">Nenhuma rede cadastrada.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex w-8 flex-col">
                  <RowButton onClick={() => moveSocialLink(item.id, "up")} title="Subir" className={i === 0 ? "opacity-30" : ""}>↑</RowButton>
                </span>
                <DynamicIcon name={item.icon} className="h-4 w-4 shrink-0 text-slate-500" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="truncate text-xs text-slate-500">{item.url}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    item.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {item.isActive ? "Ativo" : "Inativo"}
                </span>
                <RowButton onClick={() => moveSocialLink(item.id, "down")} title="Descer" className={i === items.length - 1 ? "opacity-30" : ""}>↓</RowButton>
                <RowButton onClick={() => toggleSocialLink(item.id)}>{item.isActive ? "Desativar" : "Ativar"}</RowButton>
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Editar
                </button>
                <DeleteButton onConfirm={() => deleteSocialLink(item.id)} title="Excluir rede?" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Editar rede" : "Nova rede"}>
        <EntityForm action={saveSocialLink} onSuccess={() => setOpen(false)}>
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <input type="hidden" name="order" value={editing?.order ?? 0} />
          <SelectInput
            label="Plataforma"
            name="platform"
            required
            options={platformOptions}
            defaultValue={defaultPlatform}
          />
          <TextInput label="Identificador / handle" name="handle" defaultValue={editing?.handle ?? ""} placeholder="@usuario" />
          <TextInput label="URL" name="url" required defaultValue={editing?.url ?? ""} placeholder="https://..." />
          <ToggleSwitch name="isActive" label="Ativo" defaultChecked={editing?.isActive ?? true} />
        </EntityForm>
      </Modal>
    </div>
  );
}
