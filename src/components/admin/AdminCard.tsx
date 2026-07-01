import type { ReactNode } from "react";
import Link from "next/link";

export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm admin-dark:border-slate-700 admin-dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  href?: string;
}) {
  const inner = (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300 admin-dark:border-slate-700 admin-dark:bg-slate-900 admin-dark:hover:border-slate-600">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500 admin-dark:text-slate-400">
        {label}
      </span>
      <span className="mt-2 text-2xl font-semibold text-slate-900 admin-dark:text-slate-100">{value}</span>
      {hint && <span className="mt-1 text-xs text-slate-400 admin-dark:text-slate-500">{hint}</span>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
