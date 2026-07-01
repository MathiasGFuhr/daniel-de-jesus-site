"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CloseIcon } from "./Icons";
import { usePublicI18n } from "./PublicI18nProvider";
import type { ShellData } from "@/lib/public-nav";

export function AnnouncementBar({ data }: { data: ShellData["announcement"] }) {
  const [open, setOpen] = useState(true);
  const { t } = usePublicI18n();

  if (!data.enabled || !open) return null;

  const isExternal = /^https?:\/\//.test(data.ctaUrl);

  return (
    <div className="relative bg-beige text-ink-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-10 py-2 text-center text-[13px]">
        <span className="hidden sm:inline text-gold">★</span>
        <span className="font-medium uppercase tracking-[0.14em] text-[11px] text-gold">
          {data.badge}
        </span>
        <span className="hidden text-warm-gray sm:inline">{data.text}</span>
        <Link
          href={data.ctaUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="group inline-flex items-center gap-1 font-medium text-ink underline-offset-4 hover:underline"
        >
          {data.ctaLabel}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <button
        type="button"
        aria-label={t("a11y.closeAnnouncement")}
        onClick={() => setOpen(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-warm-gray transition-colors hover:bg-beige-200 hover:text-ink"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
