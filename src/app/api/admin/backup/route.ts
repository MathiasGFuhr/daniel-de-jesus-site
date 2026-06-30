import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }

  const [site, theme, home, spotify, contact, linkPage, advanced, socials, songs, videos, products, buttons] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
      prisma.themeSettings.findUnique({ where: { id: "singleton" } }),
      prisma.homeContent.findUnique({ where: { id: "singleton" } }),
      prisma.spotifySettings.findUnique({ where: { id: "singleton" } }),
      prisma.contactSettings.findUnique({ where: { id: "singleton" } }),
      prisma.linkPage.findUnique({ where: { id: "singleton" } }),
      prisma.advancedSettings.findUnique({ where: { id: "singleton" } }),
      prisma.socialLink.findMany(),
      prisma.song.findMany(),
      prisma.video.findMany(),
      prisma.product.findMany(),
      prisma.linkPageButton.findMany(),
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
