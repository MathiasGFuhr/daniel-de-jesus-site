"use client";

import { useState } from "react";
import { Modal } from "./ConfirmDialog";
import { EntityForm } from "./EntityForm";
import { DeleteButton } from "./DeleteButton";
import { RowButton } from "./RowButton";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { ToggleSwitch } from "./ToggleSwitch";
import { ICON_OPTIONS } from "@/lib/defaults";
import {
  saveLinkButton,
  deleteLinkButton,
  toggleLinkButton,
  moveLinkButton,
} from "@/lib/actions/links";

interface Item {
  id: string;
  label: string;
  subtitle: string | null;
  url: string;
  icon: string;
  isActive: boolean;
  isPrimary: boolean;
  order: number;
}

export function LinkButtonManager({ items }: { items: Item[] }) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={() => { setEditing(null); setOpen(true); }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Adicionar botão
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            Nenhum link extra. As redes sociais vêm de Redes sociais.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {item.label}{" "}
                    {item.isPrimary && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700">Destaque</span>}
                  </p>
                  <p className="truncate text-xs text-slate-500">{item.url}</p>
                </div>
                {!item.isActive && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">Inativo</span>}
                <RowButton onClick={() => moveLinkButton(item.id, "up")} className={i === 0 ? "opacity-30" : ""}>↑</RowButton>
                <RowButton onClick={() => moveLinkButton(item.id, "down")} className={i === items.length - 1 ? "opacity-30" : ""}>↓</RowButton>
                <RowButton onClick={() => toggleLinkButton(item.id)}>{item.isActive ? "Desativar" : "Ativar"}</RowButton>
                <button type="button" onClick={() => { setEditing(item); setOpen(true); }}
                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  Editar
                </button>
                <DeleteButton onConfirm={() => deleteLinkButton(item.id)} title="Excluir botão?" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Editar botão" : "Novo botão"}>
        <EntityForm action={saveLinkButton} onSuccess={() => setOpen(false)}>
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Título" name="label" required defaultValue={editing?.label ?? ""} />
            <SelectInput label="Ícone" name="icon" options={ICON_OPTIONS} defaultValue={editing?.icon ?? "link"} />
          </div>
          <TextInput label="Subtítulo (opcional)" name="subtitle" defaultValue={editing?.subtitle ?? ""} />
          <TextInput label="URL" name="url" required defaultValue={editing?.url ?? ""} placeholder="https://... ou /loja" />
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleSwitch name="isActive" label="Ativo" defaultChecked={editing?.isActive ?? true} />
            <ToggleSwitch name="isPrimary" label="Botão em destaque" defaultChecked={editing?.isPrimary ?? false} />
          </div>
        </EntityForm>
      </Modal>
    </div>
  );
}
