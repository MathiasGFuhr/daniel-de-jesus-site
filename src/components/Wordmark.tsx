import Link from "next/link";

function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export function Wordmark({
  name,
  label,
  className = "",
  subtitle = false,
  onNavigate,
}: {
  name: string;
  label?: string;
  className?: string;
  subtitle?: boolean;
  onNavigate?: () => void;
}) {
  const [first, rest] = splitName(name);
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span className="font-display text-2xl tracking-[0.18em] uppercase">
        {first}
      </span>
      {rest && (
        <span className="font-display text-2xl tracking-[0.18em] uppercase text-gold">
          {rest}
        </span>
      )}
      {subtitle && label && (
        <span className="mt-2 text-[10px] uppercase tracking-[0.32em] text-warm-gray-light">
          {label}
        </span>
      )}
    </Link>
  );
}
