"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // A key muda a cada rota, reiniciando a animação de entrada.
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
