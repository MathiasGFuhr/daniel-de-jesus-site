"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "./Icons";
import { usePublicI18n } from "./PublicI18nProvider";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-cream-50 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray-light focus:border-gold focus:ring-2 focus:ring-gold/20";

export function ContactForm({ types, siteSlug }: { types: string[]; siteSlug: string }) {
  const { t } = usePublicI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), siteSlug };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(t("contact.error"));
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-cream-50 p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-2xl text-ink">
          {t("contact.successTitle")}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-warm-gray">
          {t("contact.successText")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold hover:underline"
        >
          {t("contact.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-cream-50 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-warm-gray">
            {t("contact.name")}
          </label>
          <input name="nome" required className={inputClass} placeholder={t("contact.namePlaceholder")} />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-warm-gray">
            {t("contact.email")}
          </label>
          <input
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder={t("contact.emailPlaceholder")}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-warm-gray">
            {t("contact.type")}
          </label>
          <select name="tipo" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {t("contact.typePlaceholder")}
            </option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-warm-gray">
            {t("contact.message")}
          </label>
          <textarea
            name="mensagem"
            required
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder={t("contact.messagePlaceholder")}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {status === "loading" ? t("contact.sending") : t("contact.send")}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
