import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }

  const tenant = await prisma.site.findUnique({ where: { ownerId: session.sub } });
  if (!tenant) {
    return NextResponse.json({ ok: false, error: "Site não encontrado." }, { status: 404 });
  }
  const siteId = tenant.id;

  const [site, theme, home, spotify, contact, linkPage, advanced, socials, songs, videos, products, buttons] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { siteId } }),
      prisma.themeSettings.findUnique({ where: { siteId } }),
      prisma.homeContent.findUnique({ where: { siteId } }),
      prisma.spotifySettings.findUnique({ where: { siteId } }),
      prisma.contactSettings.findUnique({ where: { siteId } }),
      prisma.linkPage.findUnique({ where: { siteId } }),
      prisma.advancedSettings.findUnique({ where: { siteId } }),
      prisma.socialLink.findMany({ where: { siteId } }),
      prisma.song.findMany({ where: { siteId } }),
      prisma.video.findMany({ where: { siteId } }),
      prisma.product.findMany({ where: { siteId } }),
      prisma.linkPageButton.findMany({ where: { siteId } }),
    ]);

  const backup = {
    exportedAt: new Date().toISOString(),
    site,
    theme,
    home,
    spotify,
    contact,
    linkPage,
    advanced,
    socials,
    songs,
    videos,
    products,
    buttons,
  };

  return new NextResponse(JSON.stringify(backup, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="backup-site.json"`,
    },
  });
}
