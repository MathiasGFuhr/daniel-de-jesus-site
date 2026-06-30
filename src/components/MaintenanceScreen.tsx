export function MaintenanceScreen({
  title,
  message,
  artistName,
}: {
  title: string;
  message: string;
  artistName: string;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-coal px-6 text-center text-cream-100">
      <span className="font-display text-3xl uppercase tracking-[0.2em] text-gold-soft">
        {artistName}
      </span>
      <div className="my-6 h-px w-16 bg-gold/40" />
      <h1 className="font-display text-4xl text-cream">{title}</h1>
      <p className="mt-4 max-w-sm text-sm text-cream-100/60">{message}</p>
    </div>
  );
}
