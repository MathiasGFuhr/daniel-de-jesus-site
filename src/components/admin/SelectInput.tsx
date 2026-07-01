import type { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options: readonly string[] | { value: string; label: string }[];
}

export function SelectInput({ label, hint, options, className = "", ...rest }: Props) {
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-slate-700 admin-dark:text-slate-200">{label}</span>
      )}
      <select
        {...rest}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 admin-dark:border-slate-600 admin-dark:bg-slate-800 admin-dark:text-slate-100 admin-dark:focus:border-slate-400 admin-dark:focus:ring-white/10 ${className}`}
      >
        {normalized.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <span className="mt-1 block text-xs text-slate-400 admin-dark:text-slate-500">{hint}</span>}
    </label>
  );
}
