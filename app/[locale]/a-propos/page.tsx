import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "A propos" : "About" };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  const copy = getDictionary(normalized);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-20 pt-14 md:px-8">
      <h1 className="font-display text-6xl text-base-text">{normalized === "fr" ? "A propos" : "About"}</h1>
      <article className="glass p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-text">{copy.founder.title}</p>
        <p className="mt-3 text-2xl font-semibold text-base-text">Georgeo AGBAHUNGBA</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-text">{copy.founder.bio}</p>
      </article>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="glass p-5">
          <h2 className="text-xl font-semibold text-base-text">{normalized === "fr" ? "Vision" : "Vision"}</h2>
          <p className="mt-2 text-sm text-muted-text">
            {normalized === "fr"
              ? "Communiquer une image moderne de l'agriculture et accelerer la transformation digitale des filieres."
              : "Build a modern image of agriculture and accelerate digital transformation in value chains."}
          </p>
        </article>
        <article className="glass p-5">
          <h2 className="text-xl font-semibold text-base-text">{normalized === "fr" ? "Mission" : "Mission"}</h2>
          <p className="mt-2 text-sm text-muted-text">
            {normalized === "fr"
              ? "Aider les organisations a gagner en visibilite, productivite et impact grace au digital et a l'IA."
              : "Help organizations improve visibility, productivity and impact through digital and AI."}
          </p>
        </article>
        <article className="glass p-5">
          <h2 className="text-xl font-semibold text-base-text">{normalized === "fr" ? "Execution" : "Execution"}</h2>
          <p className="mt-2 text-sm text-muted-text">
            {normalized === "fr"
              ? "Une approche terrain, orientee resultats, avec design premium et implementation technique robuste."
              : "Field-first approach with measurable outcomes, premium design and robust implementation."}
          </p>
        </article>
      </div>
    </section>
  );
}
