import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "esmusica.live — Contratá músicos en vivo para tu evento",
  description:
    "Contratá músicos en vivo para tu boda, quinceañera o evento privado. El marketplace de música en vivo en El Salvador y Guatemala.",
  metadataBase: new URL("https://esmusica.live"),
  openGraph: {
    title: "esmusica.live — Contratá músicos en vivo para tu evento",
    description:
      "Contratá músicos en vivo para tu boda, quinceañera o evento privado. El marketplace de música en vivo en El Salvador y Guatemala.",
    url: "https://esmusica.live",
    siteName: "esmusica.live",
    locale: "es_SV",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
