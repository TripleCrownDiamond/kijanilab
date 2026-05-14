import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "Glossaire" : "Glossary" };
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  const copy = getDictionary(normalized);

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-4 pb-20 pt-14 md:px-8">
      <h1 className="font-display text-6xl text-base-text">{copy.sections.glossary}</h1>
      <div className="grid gap-4">
        {copy.glossary.map((item) => (
          <article key={item.term} className="glass p-5">
            <h2 className="text-2xl font-semibold text-base-text">{item.term}</h2>
            <p className="mt-2 text-sm text-muted-text">{item.definition}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
