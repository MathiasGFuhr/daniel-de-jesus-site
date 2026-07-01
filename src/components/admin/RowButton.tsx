"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionState } from "@/lib/actions/helpers";

export function RowButton({
  onClick,
  children,
  title,
  className = "",
}: {
  onClick: () => Promise<ActionState>;
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      title={title}
      disabled={pending}
      onClick={() =>
        start(async () => {
          await onClick();
          router.refresh();
        })
      }
      className={`rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 admin-dark:border-slate-600 admin-dark:text-slate-300 admin-dark:hover:bg-slate-800 ${className}`}
    >
      {children}
    </button>
  );
}
