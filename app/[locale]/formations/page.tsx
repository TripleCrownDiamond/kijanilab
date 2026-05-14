import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, localizePath } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Formations" : "Training",
  };
}

export default async function TrainingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  const copy = getDictionary(normalized);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-20 pt-14 md:px-8">
      <h1 className="font-display text-6xl text-base-text">{copy.sections.training}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {copy.trainings.map((training) => (
          <article key={training.slug} className="glass p-6">
            <h2 className="text-xl font-semibold text-base-text">{training.title}</h2>
            <p className="mt-2 text-sm text-muted-text">{training.format}</p>
            <p className="text-sm text-muted-text">{training.duration}</p>
            <p className="text-sm text-muted-text">{training.audience}</p>
          </article>
        ))}
      </div>
      <div className="glass p-6">
        <h2 className="font-display text-4xl text-base-text">
          {normalized === "fr" ? "Espace apprenant et admin" : "Learner and admin spaces"}
        </h2>
        <p className="mt-3 text-sm text-muted-text">
          {normalized === "fr"
            ? "Inscription/connexion, dashboard utilisateur et gestion des formations cote admin via Firebase."
            : "Sign-up/sign-in, user dashboard and admin training management powered by Firebase."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={localizePath(normalized, "/auth")} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#03260c]">
            {normalized === "fr" ? "Acceder" : "Access"}
          </Link>
          <Link href={localizePath(normalized, "/dashboard")} className="rounded-full border border-border px-4 py-2 text-sm text-base-text">
            Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
