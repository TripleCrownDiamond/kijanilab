import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { FaqItem } from "@/components/faq-item";
import { InteractiveServiceCard } from "@/components/interactive-service-card";
import {
  caseStudy,
  faq,
  keyStats,
  processSteps,
  servicePreview,
  testimonials,
} from "@/data/site-data";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "KijaniLab combine expertise agri, data et IA pour accelerer votre impact terrain avec une execution digitale premium.",
};

const differentiators = [
  {
    title: "Double expertise metier + tech",
    text: "Nos equipes parlent aussi bien filieres agricoles que architecture produit.",
  },
  {
    title: "Execution orientee resultat",
    text: "Chaque sprint est relie a un KPI conversion, productivite ou impact.",
  },
  {
    title: "Approche terrain-first",
    text: "Nous testons les parcours avec les utilisateurs reels avant toute generalisation.",
  },
  {
    title: "Pilotage par la preuve",
    text: "Nous instrumentons les systemes pour rendre chaque decision audit-able.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "KijaniLab",
      url: "https://kijanilab.com",
      sameAs: ["https://www.linkedin.com/company/kijanilab"],
      areaServed: "Africa",
      description:
        "Agence agri-tech specialisee en transformation digitale, data et IA pour filieres agricoles et climat.",
    },
    {
      "@type": "Service",
      serviceType: "Transformation digitale agricole",
      provider: {
        "@type": "Organization",
        name: "KijaniLab",
      },
      areaServed: "Afrique de l'Ouest",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonials[0].name,
      },
      reviewBody: testimonials[0].quote,
      itemReviewed: {
        "@type": "Organization",
        name: "KijaniLab",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="hero-grid relative isolate overflow-hidden border-b border-white/10 pb-20 pt-16 md:pt-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div className="space-y-8 reveal-up">
            <p className="inline-flex rounded-full border border-[#8eff91]/50 bg-[#8eff91]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#aaf6ac]">
              Award-level agritech experience
            </p>
            <h1 className="font-display text-5xl leading-[0.95] text-white md:text-7xl">
              Agriculture intelligente,
              <span className="block text-[#96ff9b]">resultats mesurables.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#c8e5cd]">
              KijaniLab orchestre strategie digitale, data, IA et execution produit pour aider cooperatives, ONG et
              entreprises agroalimentaires a decider plus vite et mieux livrer sur le terrain.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#8eff91] px-6 py-3 text-sm font-semibold text-[#03260b] transition hover:-translate-y-0.5 hover:bg-[#bcffbd]"
              >
                Parler a un expert
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-[#e2f2e4] transition hover:bg-white/8"
              >
                Voir nos services
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {keyStats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-2xl px-4 py-3">
                  <p className="text-xl font-semibold text-[#9ff59f]">{stat.value}</p>
                  <p className="text-[#bed7c2]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl reveal-up">
            <div className="orbit-ring pointer-events-none absolute -inset-8 rounded-full border border-[#8eff91]/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_36px_70px_rgba(0,0,0,0.45)]">
              <Image
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
                alt="Agriculteurs analysant une culture avec technologie"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(4,20,10,0.3)_0%,rgba(4,20,10,0.8)_100%)]" />

              <div className="floaty absolute left-4 top-5 rounded-2xl border border-[#b9fdb8]/40 bg-[#0c1c12]/70 px-4 py-3 text-sm text-[#ddf5de]">
                +19% rendement moyen
              </div>
              <div className="floaty absolute bottom-6 right-5 rounded-2xl border border-[#b9fdb8]/40 bg-[#0c1c12]/70 px-4 py-3 text-sm text-[#ddf5de] [animation-delay:0.5s]">
                Reporting terrain 4x plus rapide
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5 md:px-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[#97d4a1]">Preuves immediates</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#d3ebd7]">
            <span className="rounded-full border border-white/15 px-3 py-1">11 pays d'intervention</span>
            <span className="rounded-full border border-white/15 px-3 py-1">48 projets actifs et livres</span>
            <span className="rounded-full border border-white/15 px-3 py-1">8 verticales metier couvertes</span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl space-y-12 px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-[#98d8a4]">Lignes de services</p>
              <h2 className="font-display text-4xl text-white md:text-5xl">Cartes interactives de nos expertises</h2>
              <p className="text-[#bfdcc3]">
                Chaque offre est pensee pour transformer un obstacle operationnel en levier de performance concret.
              </p>
            </div>
            <Link href="/services" className="rounded-full border border-[#8eff91]/60 px-5 py-2 text-sm font-semibold text-[#b7fdb8]">
              Voir le catalogue complet des services
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicePreview.map((service) => (
              <InteractiveServiceCard
                key={service.slug}
                title={service.title}
                summary={service.summary}
                value={service.value}
                image={service.image}
                href="/services"
              />
            ))}
          </div>

          <div className="glass-panel rounded-[1.8rem] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.26em] text-[#a8e7b3]">Besoin urgent</p>
            <h3 className="mt-2 font-display text-4xl text-white">30 minutes pour cadrer votre prochain sprint digital.</h3>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-[#8eff91] px-6 py-3 text-sm font-semibold text-[#03260b]">
                Demander un audit rapide
              </Link>
              <a href="mailto:hello@kijanilab.com" className="rounded-full border border-white/20 px-6 py-3 text-sm text-[#d8ebdb]">
                hello@kijanilab.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="mx-auto w-full max-w-7xl space-y-10 px-5 md:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-[#98d8a4]">Pourquoi KijaniLab</p>
            <h2 className="font-display text-4xl text-white">Une execution premium pensee pour le terrain.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {differentiators.map((item) => (
              <article key={item.title} className="glass-panel rounded-2xl p-6">
                <h3 className="font-display text-3xl text-[#c9ffcb]">{item.title}</h3>
                <p className="mt-3 text-[#bedac2]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl space-y-10 px-5 md:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-[#98d8a4]">Avis clients</p>
            <h2 className="font-display text-4xl text-white">Des retours precis, pas des slogans vagues.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-3xl border border-white/12 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#99d2a5]">{testimonial.organization}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#f1fff2]">{testimonial.name}</h3>
                <p className="text-sm text-[#bbd8c0]">{testimonial.role}</p>
                <p className="mt-4 text-sm text-[#d3e9d6]">Contexte: {testimonial.context}</p>
                <p className="mt-3 text-sm font-medium text-[#9ff59f]">Resultat: {testimonial.result}</p>
                <blockquote className="mt-4 border-l-2 border-[#8eff91]/60 pl-4 text-sm italic text-[#dceee0]">
                  "{testimonial.quote}"
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <article className="overflow-hidden rounded-[2rem] border border-white/15 md:grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1595336259797-9469f80f4d13?auto=format&fit=crop&w=1400&q=80"
                alt="Analyse de culture en plein champ"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#051109]/70" />
            </div>
            <div className="space-y-5 bg-[#08140d] p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.24em] text-[#9cddab]">Cas client</p>
              <h2 className="font-display text-4xl text-white">{caseStudy.title}</h2>
              <p className="text-sm text-[#cde7d2]">Probleme: {caseStudy.problem}</p>
              <p className="text-sm text-[#cde7d2]">Solution: {caseStudy.solution}</p>
              <p className="text-sm font-semibold text-[#9ff59f]">Resultat: {caseStudy.result}</p>
              <Link href="/projets" className="inline-flex rounded-full border border-[#8eff91]/60 px-5 py-2 text-sm text-[#b7fdb8]">
                Voir d'autres projets
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl space-y-10 px-5 md:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-[#98d8a4]">Process</p>
            <h2 className="font-display text-4xl text-white">Une collaboration en 4 etapes claires.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#95d9a3]">Etape {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#f0fff1]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#bbd6c0]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-5 md:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-[#98d8a4]">FAQ conversion</p>
            <h2 className="font-display text-4xl text-white">Les questions qui bloquent souvent la decision.</h2>
          </div>
          <div className="grid gap-4">
            {faq.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:grid-cols-[1fr_1fr] md:px-8">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-[#98d8a4]">CTA final</p>
            <h2 className="font-display text-5xl leading-tight text-white">Discutons de votre prochain cas d'usage agricole.</h2>
            <p className="text-[#c5dfca]">
              Formulaire court, reponse rapide. Vous pouvez aussi nous joindre par email ou WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="mailto:hello@kijanilab.com" className="rounded-full border border-white/20 px-4 py-2 text-[#d8ebdb]">
                hello@kijanilab.com
              </a>
              <a href="https://wa.me/22900000000" className="rounded-full border border-white/20 px-4 py-2 text-[#d8ebdb]">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="glass-panel rounded-[1.8rem] p-6">
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
