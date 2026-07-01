import type { ReactNode } from "react";

export function AdminSection({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm admin-dark:border-slate-700 admin-dark:bg-slate-900">
      <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between admin-dark:border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-slate-900 admin-dark:text-slate-100">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-slate-500 admin-dark:text-slate-400">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 admin-dark:text-slate-100">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500 admin-dark:text-slate-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
