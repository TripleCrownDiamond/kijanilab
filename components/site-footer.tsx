import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#040a07] py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.32em] text-[#92dfa3]">KijaniLab</p>
          <p className="max-w-md text-sm text-[#b9d7bd]">
            Agri-tech, data et transformation digitale pour les chaines de valeur agricoles et climatiques.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#b9d7bd]">
          <Link href="/services" className="transition hover:text-white">
            Services
          </Link>
          <Link href="/projets" className="transition hover:text-white">
            Projets
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
          <p className="text-[#8aac92]">© {new Date().getFullYear()} KijaniLab</p>
        </div>
      </div>
    </footer>
  );
}
