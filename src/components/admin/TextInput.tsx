import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function TextInput({ label, hint, error, className = "", ...rest }: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-slate-700 admin-dark:text-slate-200">
          {label}
          {rest.required && <span className="text-rose-500"> *</span>}
        </span>
      )}
      <input
        {...rest}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10 admin-dark:border-slate-600 admin-dark:bg-slate-800 admin-dark:text-slate-100 admin-dark:placeholder:text-slate-500 admin-dark:focus:border-slate-400 admin-dark:focus:ring-white/10 ${
          error ? "border-rose-400 focus:border-rose-400" : "border-slate-300 focus:border-slate-900"
        } ${className}`}
      />
      {error ? (
        <span className="mt-1 block text-xs text-rose-500">{error}</span>
      ) : (
        hint && <span className="mt-1 block text-xs text-slate-400 admin-dark:text-slate-500">{hint}</span>
      )}
    </label>
  );
}
