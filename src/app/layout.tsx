import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings, getThemeSettings, getAdvancedSettings } from "@/lib/data";
import { buildThemeCss } from "@/lib/theme-css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: {
      default: `${site.artistName} — ${site.artistLabel}`,
      template: `%s — ${site.artistName}`,
    },
    description: site.description,
    icons: site.faviconUrl ? { icon: site.faviconUrl } : undefined,
    openGraph: {
      title: `${site.artistName} — ${site.artistLabel}`,
      description: site.description,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, advanced] = await Promise.all([
    getThemeSettings(),
    getAdvancedSettings(),
  ]);

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss(theme) }} />
      </head>
      <body suppressHydrationWarning className="min-h-full">
        {advanced.customHeadCode ? (
          <div
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: advanced.customHeadCode }}
          />
        ) : null}
        {children}
        {advanced.customFooterCode ? (
          <div
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: advanced.customFooterCode }}
          />
        ) : null}
      </body>
    </html>
  );
}
