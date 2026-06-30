import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { defaultTheme } from "@/lib/defaults";
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

export const metadata: Metadata = {
  title: {
    default: "Crie o site do seu cantor",
    template: "%s",
  },
  description:
    "Crie uma página completa para o seu cantor e gerencie tudo por um painel simples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss(defaultTheme) }} />
      </head>
      <body suppressHydrationWarning className="min-h-full">
        {children}
      </body>
    </html>
  );
}
