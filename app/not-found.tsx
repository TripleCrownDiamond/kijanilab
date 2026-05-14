import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-accent-text">404</p>
      <h1 className="font-display text-6xl text-base-text">Page introuvable</h1>
      <p className="text-sm text-muted-text">La page demandee est introuvable. Retournez a l&apos;accueil.</p>
      <Link href="/fr" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-[#03260c]">
        Retour accueil
      </Link>
    </main>
  );
}
