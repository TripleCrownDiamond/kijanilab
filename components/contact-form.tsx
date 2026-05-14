"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  locale: string;
};

export function ContactForm({ locale }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        organization: data.get("organization"),
        projectType: data.get("projectType"),
        message: data.get("message"),
        locale,
      }),
    });

    if (!response.ok) {
      setStatus(locale === "fr" ? "Echec envoi. Reessayez." : "Sending failed. Please retry.");
      setLoading(false);
      return;
    }

    event.currentTarget.reset();
    setStatus(locale === "fr" ? "Demande envoyee. Reponse sous 24h." : "Request sent. We reply within 24h.");
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input required name="name" placeholder={locale === "fr" ? "Nom complet" : "Full name"} className="field" />
        <input required type="email" name="email" placeholder="Email" className="field" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input name="organization" placeholder={locale === "fr" ? "Organisation" : "Organization"} className="field" />
        <input
          name="projectType"
          placeholder={locale === "fr" ? "Type de projet (site, IA, app...)" : "Project type (web, AI, app...)"}
          className="field"
        />
      </div>
      <textarea
        required
        rows={5}
        name="message"
        placeholder={locale === "fr" ? "Decrivez votre besoin" : "Describe your needs"}
        className="field"
      />
      <button className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-[#04290d] transition hover:-translate-y-0.5" disabled={loading}>
        {loading ? (locale === "fr" ? "Envoi..." : "Sending...") : locale === "fr" ? "Envoyer la demande de devis" : "Send quote request"}
      </button>
      {status ? <p className="text-sm text-muted-text">{status}</p> : null}
    </form>
  );
}
