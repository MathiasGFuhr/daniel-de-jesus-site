import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const site = await prisma.site.findUnique({ where: { ownerId: session.sub } });
  if (!site) redirect("/admin/register");

  const settings = await getSiteSettings(site.id);

  return (
    <AdminLayout userName={session.name || session.email} siteName={settings.artistName}>
      {children}
    </AdminLayout>
  );
}
