import { PageHeading } from "@/components/admin/AdminSection";
import { SocialLinkManager } from "@/components/admin/SocialLinkManager";
import { getSocialLinks } from "@/lib/data";
import { getCurrentSite } from "@/lib/tenant";

export default async function RedesPage() {
  const site = await getCurrentSite();
  const items = await getSocialLinks(site.id);
  return (
    <>
      <PageHeading
        title="Redes sociais"
        description="Gerencie os links sociais exibidos no site e na central de links."
      />
      <SocialLinkManager
        items={items.map((i) => ({
          id: i.id,
          label: i.label,
          handle: i.handle,
          url: i.url,
          icon: i.icon,
          isActive: i.isActive,
          order: i.order,
        }))}
      />
    </>
  );
}
