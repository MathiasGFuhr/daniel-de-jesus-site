import Link from "next/link";
import { DynamicIcon } from "@/components/Icons";

type Item = {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string;
  isActive: boolean;
};

export function SyncedSocialLinks({ items }: { items: Item[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white admin-dark:border-slate-700 admin-dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 admin-dark:border-slate-800">
        <p className="text-sm text-slate-600 admin-dark:text-slate-300">
          As redes cadastradas em <strong>Redes sociais</strong> aparecem aqui automaticamente.
        </p>
        <Link
          href="/admin/redes"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 admin-dark:border-slate-600 admin-dark:text-slate-200 admin-dark:hover:bg-slate-800"
        >
          Gerenciar redes
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400 admin-dark:text-slate-500">
          Nenhuma rede cadastrada. Adicione em Redes sociais.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 admin-dark:divide-slate-800">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              <DynamicIcon name={item.icon} className="h-4 w-4 shrink-0 text-slate-500 admin-dark:text-slate-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 admin-dark:text-slate-100">{item.label}</p>
                <p className="truncate text-xs text-slate-500 admin-dark:text-slate-400">{item.handle || item.url}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  item.isActive
                    ? "bg-emerald-50 text-emerald-700 admin-dark:bg-emerald-950/40 admin-dark:text-emerald-400"
                    : "bg-slate-100 text-slate-400 admin-dark:bg-slate-800 admin-dark:text-slate-500"
                }`}
              >
                {item.isActive ? "Ativo" : "Inativo"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
