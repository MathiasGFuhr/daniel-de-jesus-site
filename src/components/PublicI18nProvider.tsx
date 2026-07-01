"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Messages } from "@/messages/pt-BR";
import type { Locale } from "@/lib/i18n-shared";
import { translate } from "@/lib/i18n-shared";

type PublicI18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (key: string, params?: Record<string, string>) => string;
};

const PublicI18nContext = createContext<PublicI18nContextValue | null>(null);

export function PublicI18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value: PublicI18nContextValue = {
    locale,
    messages,
    t: (key, params) => translate(messages, key, params),
  };

  return (
    <PublicI18nContext.Provider value={value}>{children}</PublicI18nContext.Provider>
  );
}

export function usePublicI18n() {
  const ctx = useContext(PublicI18nContext);
  if (!ctx) {
    throw new Error("usePublicI18n must be used within PublicI18nProvider");
  }
  return ctx;
}
