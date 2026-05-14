import type { Metadata } from "next";
import { ShowcaseHtmlPage, getShowcaseMetadata } from "@/components/showcase-html-page";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  return getShowcaseMetadata("contact", normalized);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";

  return <ShowcaseHtmlPage locale={normalized} page="contact" />;
}
