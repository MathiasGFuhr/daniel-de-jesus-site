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

// --- Resolução de tenant ---

export const getSiteBySlug = cache(async (slug: string) => {
  return prisma.site.findUnique({ where: { slug } });
});

// --- Singletons por site: leem ou criam com defaults ---

export const getSiteSettings = cache(async (siteId: string) => {
  return prisma.siteSettings.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultSiteSettings, siteId },
  });
});

export const getThemeSettings = cache(async (siteId: string) => {
  return prisma.themeSettings.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultTheme, siteId },
  });
});

export const getHomeContent = cache(async (siteId: string) => {
  return prisma.homeContent.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultHome, siteId },
  });
});

export const getSpotifySettings = cache(async (siteId: string) => {
  return prisma.spotifySettings.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultSpotify, siteId },
  });
});

export const getContactSettings = cache(async (siteId: string) => {
  return prisma.contactSettings.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultContact, siteId },
  });
});

export const getLinkPage = cache(async (siteId: string) => {
  return prisma.linkPage.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultLinkPage, siteId },
  });
});

export const getAdvancedSettings = cache(async (siteId: string) => {
  return prisma.advancedSettings.upsert({
    where: { siteId },
    update: {},
    create: { ...defaultAdvanced, siteId },
  });
});

// --- Listas por site ---

export const getSocialLinks = cache(async (siteId: string, activeOnly = false) => {
  return prisma.socialLink.findMany({
    where: { siteId, ...(activeOnly ? { isActive: true } : {}) },
    orderBy: { order: "asc" },
  });
});

export const getSongs = cache(async (siteId: string, activeOnly = false) => {
  return prisma.song.findMany({
    where: { siteId, ...(activeOnly ? { isActive: true } : {}) },
    orderBy: { order: "asc" },
  });
});

export const getVideos = cache(async (siteId: string, activeOnly = false) => {
  return prisma.video.findMany({
    where: { siteId, ...(activeOnly ? { isActive: true } : {}) },
    orderBy: { order: "asc" },
  });
});

export const getProducts = cache(async (siteId: string, activeOnly = false) => {
  return prisma.product.findMany({
    where: { siteId, ...(activeOnly ? { isActive: true } : {}) },
    orderBy: { order: "asc" },
  });
});

export const getLinkButtons = cache(async (siteId: string, activeOnly = false) => {
  return prisma.linkPageButton.findMany({
    where: { siteId, ...(activeOnly ? { isActive: true } : {}) },
    orderBy: { order: "asc" },
  });
});

export const getContactMessages = cache(async (siteId: string) => {
  return prisma.contactMessage.findMany({
    where: { siteId },
    orderBy: { createdAt: "desc" },
  });
});

export function parseContactTypes(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
