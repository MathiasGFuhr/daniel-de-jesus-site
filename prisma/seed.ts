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

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@danieldejesus.art";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { name: "Proprietário", email, passwordHash, role: "owner" },
  });
  console.log(`✓ Usuário admin: ${email}`);

  await prisma.siteSettings.upsert({ where: { id: "singleton" }, update: {}, create: defaultSiteSettings });
  await prisma.themeSettings.upsert({ where: { id: "singleton" }, update: {}, create: defaultTheme });
  await prisma.homeContent.upsert({ where: { id: "singleton" }, update: {}, create: defaultHome });
  await prisma.spotifySettings.upsert({ where: { id: "singleton" }, update: {}, create: defaultSpotify });
  await prisma.contactSettings.upsert({ where: { id: "singleton" }, update: {}, create: defaultContact });
  await prisma.linkPage.upsert({ where: { id: "singleton" }, update: {}, create: defaultLinkPage });
  await prisma.advancedSettings.upsert({ where: { id: "singleton" }, update: {}, create: defaultAdvanced });
  console.log("✓ Configurações singleton");

  if ((await prisma.socialLink.count()) === 0) {
    await prisma.socialLink.createMany({ data: defaultSocialLinks });
    console.log(`✓ ${defaultSocialLinks.length} redes sociais`);
  }
  if ((await prisma.song.count()) === 0) {
    await prisma.song.createMany({ data: defaultSongs });
    console.log(`✓ ${defaultSongs.length} músicas`);
  }
  if ((await prisma.video.count()) === 0) {
    await prisma.video.createMany({ data: defaultVideos });
    console.log(`✓ ${defaultVideos.length} vídeos`);
  }
  if ((await prisma.product.count()) === 0) {
    await prisma.product.createMany({ data: defaultProducts });
    console.log(`✓ ${defaultProducts.length} produtos`);
  }
  if ((await prisma.linkPageButton.count()) === 0) {
    await prisma.linkPageButton.createMany({ data: defaultLinkButtons });
    console.log(`✓ ${defaultLinkButtons.length} botões da página de links`);
  }

  console.log("\nSeed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
