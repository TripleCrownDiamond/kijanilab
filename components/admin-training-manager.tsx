"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addTraining, fetchTrainings, type TrainingRecord } from "@/lib/firestore";
import { useAuth } from "@/contexts/auth-context";

export function AdminTrainingManager({ locale }: { locale: string }) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [rows, setRows] = useState<TrainingRecord[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/auth`);
      return;
    }

    if (!loading && profile?.role !== "admin") {
      router.push(`/${locale}/dashboard`);
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const trainings = await fetchTrainings();
        if (active) {
          setRows(trainings);
        }
      } catch {
        if (active) {
          setFeedback(locale === "fr" ? "Firebase non configure." : "Firebase not configured.");
        }
      }
    };

    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [loading, user, profile, locale, router]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await addTraining({
        title: String(data.get("title") ?? ""),
        format: String(data.get("format") ?? ""),
        duration: String(data.get("duration") ?? ""),
        level: String(data.get("level") ?? ""),
      });
      event.currentTarget.reset();
      setFeedback(locale === "fr" ? "Formation ajoutee." : "Training added.");

      const trainings = await fetchTrainings();
      setRows(trainings);
    } catch {
      setFeedback(locale === "fr" ? "Impossible d'ajouter." : "Failed to add training.");
    }
  };

  if (loading || !user) {
    return <p className="text-muted-text">Loading...</p>;
  }

  if (profile?.role !== "admin") {
    return null;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="glass space-y-3 p-6">
        <h1 className="font-display text-4xl text-base-text">{locale === "fr" ? "Gestion des formations" : "Training management"}</h1>
        <div className="grid gap-3 md:grid-cols-2">
          <input name="title" required placeholder={locale === "fr" ? "Titre" : "Title"} className="field" />
          <input name="format" required placeholder={locale === "fr" ? "Format" : "Format"} className="field" />
          <input name="duration" required placeholder={locale === "fr" ? "Duree" : "Duration"} className="field" />
          <input name="level" required placeholder={locale === "fr" ? "Niveau" : "Level"} className="field" />
        </div>
        <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#03260c]">
          {locale === "fr" ? "Ajouter" : "Add training"}
        </button>
        {feedback ? <p className="text-sm text-muted-text">{feedback}</p> : null}
      </form>

      <div className="glass p-6">
        <h2 className="font-display text-3xl text-base-text">{locale === "fr" ? "Catalogue" : "Catalogue"}</h2>
        <div className="mt-4 grid gap-3">
          {rows.map((row) => (
            <article key={row.id} className="rounded-xl border border-border p-4">
              <h3 className="font-semibold text-base-text">{row.title}</h3>
              <p className="text-sm text-muted-text">
                {row.format} - {row.duration} - {row.level}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
