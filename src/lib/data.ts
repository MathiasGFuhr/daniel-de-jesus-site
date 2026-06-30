import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";
import {
  defaultSiteSettings,
  defaultTheme,
  defaultHome,
  defaultSpotify,
  defaultContact,
  defaultLinkPage,
  defaultAdvanced,
} from "./defaults";

// --- Singletons: leem ou criam com defaults ---

export const getSiteSettings = cache(async () => {
  return prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultSiteSettings,
  });
});

export const getThemeSettings = cache(async () => {
  return prisma.themeSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultTheme,
  });
});

export const getHomeContent = cache(async () => {
  return prisma.homeContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultHome,
  });
});

export const getSpotifySettings = cache(async () => {
  return prisma.spotifySettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultSpotify,
  });
});

export const getContactSettings = cache(async () => {
  return prisma.contactSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultContact,
  });
});

export const getLinkPage = cache(async () => {
  return prisma.linkPage.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultLinkPage,
  });
});

export const getAdvancedSettings = cache(async () => {
  return prisma.advancedSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: defaultAdvanced,
  });
});

// --- Listas ---

export const getSocialLinks = cache(async (activeOnly = false) => {
  return prisma.socialLink.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getSongs = cache(async (activeOnly = false) => {
  return prisma.song.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getVideos = cache(async (activeOnly = false) => {
  return prisma.video.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getProducts = cache(async (activeOnly = false) => {
  return prisma.product.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getLinkButtons = cache(async (activeOnly = false) => {
  return prisma.linkPageButton.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { order: "asc" },
  });
});

export const getContactMessages = cache(async () => {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
});

export function parseContactTypes(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
