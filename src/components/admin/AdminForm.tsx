"use client";

import { useActionState, type ReactNode } from "react";
import Link from "next/link";
import { SaveButton } from "./SaveButton";
import type { ActionState } from "@/lib/actions/helpers";

type Action = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function AdminForm({
  action,
  children,
  submitLabel,
  cancelHref,
  previewHref,
  extra,
}: {
  action: Action;
  children: ReactNode;
  submitLabel?: string;
  cancelHref?: string;
  previewHref?: string;
  extra?: ReactNode;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="space-y-6">
      {children}

      {state && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
        <SaveButton label={submitLabel} />
        {cancelHref && (
          <Link
            href={cancelHref}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </Link>
        )}
        {previewHref && (
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Pré-visualizar
          </a>
        )}
        {extra}
      </div>
    </form>
  );
}
