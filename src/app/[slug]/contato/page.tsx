import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRightIcon, ContactIcon } from "@/components/Icons";
import { getPublicI18n } from "@/lib/i18n";
import { getSiteBySlug, getContactSettings, parseContactTypes } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getPublicI18n();
  return { title: t("meta.contact"), description: t("meta.contactDesc") };
}

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getSiteBySlug(slug);
  if (!tenant) notFound();
  const { t } = await getPublicI18n();

  const c = await getContactSettings(tenant.id);
  const types = parseContactTypes(c.contactTypes);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("contact.eyebrow")}
        title={c.headline || t("contact.title")}
        description={c.description}
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <ContactForm types={types} siteSlug={tenant.slug} />

        <div className="space-y-4">
          <a
            href={`mailto:${c.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-cream-50 p-5 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/12 text-gold">
              <ContactIcon className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-ink">
                {t("contact.commercialEmail")}
              </span>
              <span className="block text-xs text-warm-gray">{c.email}</span>
            </span>
            <ArrowUpRightIcon className="h-4 w-4 text-warm-gray-light transition-colors group-hover:text-gold" />
          </a>
        </div>
      </div>
    </Section>
  );
}
