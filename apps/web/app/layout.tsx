import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";

import { AuthProvider } from "@/components/providers/auth-provider";
import { siteAssets } from "@/lib/assets";

import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BOCAO",
  description: "Plataforma de suscripcion de comida saludable BOCAO",
  icons: {
    icon: [
      { url: siteAssets.logo, type: "image/webp", sizes: "192x192" },
      { url: siteAssets.favicon, sizes: "any" },
    ],
    shortcut: siteAssets.favicon,
    apple: siteAssets.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${displayFont.variable} ${sansFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
