import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  defaultSiteSettings,
  defaultTheme,
  defaultHome,
  defaultSpotify,
  defaultContact,
  defaultLinkPage,
  defaultAdvanced,
  defaultSocialLinks,
  defaultSongs,
  defaultVideos,
  defaultProducts,
  defaultLinkButtons,
} from "../src/lib/defaults";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const EXAMPLE_SLUG = "daniel-de-jesus";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@danieldejesus.art";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { name: "Daniel de Jesus", email, passwordHash, role: "owner" },
  });
  console.log(`✓ Usuário admin: ${email}`);

  let site = await prisma.site.findUnique({ where: { ownerId: user.id } });
  if (!site) {
    site = await prisma.site.create({
      data: { slug: EXAMPLE_SLUG, ownerId: user.id },
    });
    console.log(`✓ Site de exemplo: /${site.slug}`);
  }
  const siteId = site.id;

  await prisma.siteSettings.upsert({ where: { siteId }, update: {}, create: { ...defaultSiteSettings, siteId } });
  await prisma.themeSettings.upsert({ where: { siteId }, update: {}, create: { ...defaultTheme, siteId } });
  await prisma.homeContent.upsert({ where: { siteId }, update: {}, create: { ...defaultHome, siteId } });
  await prisma.spotifySettings.upsert({ where: { siteId }, update: {}, create: { ...defaultSpotify, siteId } });
  await prisma.contactSettings.upsert({ where: { siteId }, update: {}, create: { ...defaultContact, siteId } });
  await prisma.linkPage.upsert({ where: { siteId }, update: {}, create: { ...defaultLinkPage, siteId } });
  await prisma.advancedSettings.upsert({ where: { siteId }, update: {}, create: { ...defaultAdvanced, siteId } });
  console.log("✓ Configurações do site de exemplo");

  if ((await prisma.socialLink.count({ where: { siteId } })) === 0) {
    await prisma.socialLink.createMany({ data: defaultSocialLinks.map((d) => ({ ...d, siteId })) });
    console.log(`✓ ${defaultSocialLinks.length} redes sociais`);
  }
  if ((await prisma.song.count({ where: { siteId } })) === 0) {
    await prisma.song.createMany({ data: defaultSongs.map((d) => ({ ...d, siteId })) });
    console.log(`✓ ${defaultSongs.length} músicas`);
  }
  if ((await prisma.video.count({ where: { siteId } })) === 0) {
    await prisma.video.createMany({ data: defaultVideos.map((d) => ({ ...d, siteId })) });
    console.log(`✓ ${defaultVideos.length} vídeos`);
  }
  if ((await prisma.product.count({ where: { siteId } })) === 0) {
    await prisma.product.createMany({ data: defaultProducts.map((d) => ({ ...d, siteId })) });
    console.log(`✓ ${defaultProducts.length} produtos`);
  }
  if ((await prisma.linkPageButton.count({ where: { siteId } })) === 0) {
    await prisma.linkPageButton.createMany({ data: defaultLinkButtons.map((d) => ({ ...d, siteId })) });
    console.log(`✓ ${defaultLinkButtons.length} botões da página de links`);
  }

  console.log(`\nSeed concluído! Site de exemplo em /${site.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
