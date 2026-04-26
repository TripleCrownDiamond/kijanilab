"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  compact?: boolean;
};

export function ContactForm({ compact = false }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        organization: formData.get("organization"),
        message: formData.get("message"),
      }),
    });

    if (!response.ok) {
      setMessage("Impossible d'envoyer pour le moment. Essayez encore dans quelques minutes.");
      setLoading(false);
      return;
    }

    event.currentTarget.reset();
    setMessage("Message envoye. Notre equipe vous recontacte sous 24h ouvrables.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#cbebcf]">
          Nom complet
          <input
            required
            name="name"
            className="w-full rounded-xl border border-white/15 bg-[#07140e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#9ff59f]/80"
          />
        </label>
        <label className="space-y-2 text-sm text-[#cbebcf]">
          Email pro
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-xl border border-white/15 bg-[#07140e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#9ff59f]/80"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-[#cbebcf]">
        Organisation
        <input
          name="organization"
          className="w-full rounded-xl border border-white/15 bg-[#07140e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#9ff59f]/80"
        />
      </label>

      <label className="space-y-2 text-sm text-[#cbebcf]">
        Votre besoin
        <textarea
          required
          name="message"
          rows={compact ? 3 : 5}
          className="w-full rounded-xl border border-white/15 bg-[#07140e] px-4 py-3 text-sm text-white outline-none transition focus:border-[#9ff59f]/80"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#8eff91] px-6 py-3 text-sm font-semibold text-[#022909] transition hover:-translate-y-0.5 hover:bg-[#b6ffb8] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Envoi en cours..." : "Demander un cadrage"}
      </button>

      {message ? <p className="text-sm text-[#b9e7bf]">{message}</p> : null}
    </form>
  );
}
