import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "Impact" : "Impact" };
}

const extraImpact = [
  {
    title: "Capteurs et irrigation intelligente",
    text: "Instrumentation des parcelles, automatisation des cycles d'arrosage et alerte previsionnelle de stress hydrique.",
  },
  {
    title: "Economie agroalimentaire",
    text: "Optimisation des flux de transformation, baisse des pertes post-recolte et pilotage des couts de production.",
  },
  {
    title: "Technologies complementaires",
    text: "Blockchain pour tracabilite, IoT pour terrain, et IA pour prevision et support aux decisions.",
  },
];

export default async function ImpactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  const copy = getDictionary(normalized);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-20 pt-14 md:px-8">
      <h1 className="font-display text-6xl text-base-text">{copy.sections.odss}</h1>
      <article className="glass p-6">
        <p className="text-sm text-muted-text">{copy.odss.text}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {copy.odss.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-border px-3 py-1 text-xs text-base-text">
              {chip}
            </span>
          ))}
        </div>
      </article>
      <div className="grid gap-4 md:grid-cols-3">
        {extraImpact.map((item) => (
          <article key={item.title} className="glass p-5">
            <h2 className="text-xl font-semibold text-base-text">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-text">{item.text}</p>
          </article>
        ))}
      </div>
      <div className="glass overflow-hidden p-2">
        <Image
          src="/generated/smart-irrigation.svg"
          alt="Smart irrigation"
          width={1200}
          height={800}
          className="h-auto w-full rounded-xl"
        />
      </div>
    </section>
  );
}
