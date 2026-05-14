import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kijanilab.com"),
  title: {
    default: "KijaniLab | Agritech Digital Agency",
    template: "%s | KijaniLab",
  },
  description:
    "KijaniLab is a digital agritech agency helping cooperatives, agribusinesses, NGOs and institutions improve visibility, automate operations and integrate AI.",
  openGraph: {
    title: "KijaniLab",
    description:
      "Award-winning agritech web experience with digital strategy, automation, AI and value-chain intelligence.",
    type: "website",
    url: "https://kijanilab.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A1410" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link href="/showcase/assets/styles.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}


