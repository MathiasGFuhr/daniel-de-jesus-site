"use client";

import { useActionState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SaveButton } from "./SaveButton";
import type { ActionState } from "@/lib/actions/helpers";

type Action = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function EntityForm({
  action,
  children,
  onSuccess,
  submitLabel = "Salvar",
}: {
  action: Action;
  children: ReactNode;
  onSuccess: () => void;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {children}
      {state && !state.ok && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
          {state.message}
        </p>
      )}
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
        <SaveButton label={submitLabel} />
      </div>
    </form>
  );
}
