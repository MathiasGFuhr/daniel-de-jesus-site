"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import type { ActionState } from "@/lib/actions/helpers";

export function DeleteButton({
  onConfirm,
  label = "Excluir",
  title,
  message,
}: {
  onConfirm: () => Promise<ActionState>;
  label?: string;
  title?: string;
  message?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await onConfirm();
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
      >
        {label}
      </button>
      <ConfirmDialog
        open={open}
        loading={pending}
        title={title}
        message={message}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
