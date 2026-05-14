"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchTrainings, type TrainingRecord } from "@/lib/firestore";
import { useAuth } from "@/contexts/auth-context";

export function DashboardPanel({ locale }: { locale: string }) {
  const router = useRouter();
  const { user, profile, loading, logout } = useAuth();
  const [trainings, setTrainings] = useState<TrainingRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/auth`);
    }
  }, [loading, user, router, locale]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchTrainings();
        setTrainings(rows);
      } catch {
        setError(locale === "fr" ? "Configure Firebase pour voir les formations live." : "Configure Firebase to view live trainings.");
      }
    };

    load();
  }, [locale]);

  if (loading) {
    return <p className="text-muted-text">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="glass p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-text">{locale === "fr" ? "Compte" : "Account"}</p>
        <h1 className="mt-2 font-display text-4xl text-base-text">{profile?.displayName ?? user.email}</h1>
        <p className="text-sm text-muted-text">{profile?.role === "admin" ? "Admin" : locale === "fr" ? "Utilisateur" : "User"}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {profile?.role === "admin" ? (
            <Link href={`/${locale}/admin`} className="rounded-full border border-border px-4 py-2 text-sm text-base-text">
              {locale === "fr" ? "Ouvrir admin" : "Open admin"}
            </Link>
          ) : null}
          <button onClick={() => logout()} className="rounded-full border border-border px-4 py-2 text-sm text-base-text">
            {locale === "fr" ? "Se deconnecter" : "Sign out"}
          </button>
        </div>
      </div>

      <div className="glass p-6">
        <h2 className="font-display text-3xl text-base-text">{locale === "fr" ? "Formations disponibles" : "Available training"}</h2>
        <div className="mt-4 grid gap-3">
          {trainings.map((training) => (
            <article key={training.id} className="rounded-2xl border border-border p-4">
              <h3 className="text-lg font-semibold text-base-text">{training.title}</h3>
              <p className="text-sm text-muted-text">
                {training.format} - {training.duration} - {training.level}
              </p>
            </article>
          ))}
          {trainings.length === 0 ? (
            <p className="text-sm text-muted-text">{error ?? (locale === "fr" ? "Aucune formation pour le moment." : "No training yet.")}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
