import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";
import { requireSession } from "./auth";

/** Site (cantor) da conta logada. Lança se não houver sessão ou site. */
export const getCurrentSite = cache(async () => {
  const session = await requireSession();
  const site = await prisma.site.findUnique({
    where: { ownerId: session.sub },
  });
  if (!site) throw new Error("NO_SITE");
  return site;
});

/** Apenas o id do site da conta logada. */
export async function requireSiteId(): Promise<string> {
  const site = await getCurrentSite();
  return site.id;
}
