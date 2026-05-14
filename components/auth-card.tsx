"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

type AuthCardProps = {
  locale: string;
};

export function AuthCard({ locale }: AuthCardProps) {
  const router = useRouter();
  const { login, register, firebaseEnabled } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "");

    try {
      if (!firebaseEnabled) {
        throw new Error(locale === "fr" ? "Firebase non configure." : "Firebase not configured.");
      }
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      router.push(`/${locale}/dashboard`);
    } catch (error) {
      const fallback = locale === "fr" ? "Impossible de continuer." : "Unable to continue.";
      setMessage(error instanceof Error ? error.message : fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6">
      <div className="mb-4 flex rounded-full border border-border bg-panel p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-3 py-2 ${mode === "login" ? "bg-accent text-[#03260c]" : "text-muted-text"}`}
        >
          {locale === "fr" ? "Connexion" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 rounded-full px-3 py-2 ${mode === "register" ? "bg-accent text-[#03260c]" : "text-muted-text"}`}
        >
          {locale === "fr" ? "Inscription" : "Sign up"}
        </button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode === "register" ? (
          <input name="name" required placeholder={locale === "fr" ? "Nom complet" : "Full name"} className="field" />
        ) : null}
        <input type="email" name="email" required placeholder="Email" className="field" />
        <input type="password" name="password" required minLength={6} placeholder="Password" className="field" />
        <button disabled={loading} className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-[#03260c]">
          {loading
            ? locale === "fr"
              ? "Traitement..."
              : "Processing..."
            : mode === "login"
              ? locale === "fr"
                ? "Se connecter"
                : "Sign in"
              : locale === "fr"
                ? "Creer un compte"
                : "Create account"}
        </button>
      </form>

      {message ? <p className="mt-3 text-sm text-muted-text">{message}</p> : null}
      {!firebaseEnabled ? (
        <p className="mt-2 text-xs text-muted-text">
          {locale === "fr"
            ? "Ajoutez vos variables NEXT_PUBLIC_FIREBASE_* pour activer l'authentification."
            : "Add NEXT_PUBLIC_FIREBASE_* variables to enable authentication."}
        </p>
      ) : null}
    </div>
  );
}
