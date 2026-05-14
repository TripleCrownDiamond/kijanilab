import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { ShowcaseHtmlPage, getShowcaseMetadata } from "@/components/showcase-html-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  return getShowcaseMetadata("home", normalized);
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";

  return <ShowcaseHtmlPage locale={normalized} page="home" />;
}

