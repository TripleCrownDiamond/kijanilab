import Link from "next/link";
import Image from "next/image";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/secteurs", label: "Secteurs" },
  { href: "/projets", label: "Projets" },
  { href: "/impact", label: "Impact" },
  { href: "/a-propos", label: "A propos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060f0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/kijanilab-logo.svg"
            alt="KijaniLab"
            width={160}
            height={42}
            className="h-9 w-auto transition duration-300 group-hover:brightness-110"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-[#d8f7d8] transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full border border-[#89f68d]/60 bg-[#89f68d]/10 px-4 py-2 text-sm font-semibold text-[#d8ffd9] transition hover:-translate-y-0.5 hover:bg-[#89f68d]/20 md:inline-flex"
        >
          Parler a un expert
        </Link>

        <details className="md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/20 px-3 py-1 text-sm text-[#d8f7d8]">
            Menu
          </summary>
          <div className="absolute right-5 mt-3 w-52 rounded-2xl border border-white/10 bg-[#08170f] p-3 shadow-2xl">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm text-[#d8f7d8] transition hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
