import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kijanilab.com"),
  title: {
    default: "KijaniLab | Agri-Tech, Data et Transformation Digitale",
    template: "%s | KijaniLab",
  },
  description:
    "KijaniLab accompagne cooperatives, ONG et entreprises agroalimentaires avec des solutions data, IA et produits digitaux orientes impact.",
  keywords: [
    "agritech",
    "transformation digitale agricole",
    "data agriculture",
    "kijanilab",
    "climat et environnement",
  ],
  openGraph: {
    title: "KijaniLab",
    description:
      "Agence agri-tech premium: strategie digitale, data, IA, automatisation et produits web/mobile.",
    type: "website",
    locale: "fr_FR",
    url: "https://kijanilab.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${displayFont.variable} ${bodyFont.variable} h-full`}>
      <body className="min-h-full bg-[#040b08] text-[#e6f6e8] antialiased">{children}</body>
    </html>
  );
}
