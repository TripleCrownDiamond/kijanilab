import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath } from "@/lib/i18n";
import type { Locale } from "@/data/site-content";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2">
          <Image
            src="/kijanilab-icon-green.svg"
            alt="KijaniLab icon"
            width={42}
            height={42}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-2xl text-base-text">KijaniLab</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {copy.nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={localizePath(locale, item.href)}
              className="text-sm text-muted-text transition hover:text-base-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
          <Link
            href={localizePath(locale, "/contact")}
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#03260c] transition hover:-translate-y-0.5 md:inline-flex"
          >
            {copy.cta.primary}
          </Link>

          <details className="xl:hidden">
            <summary className="inline-flex h-10 cursor-pointer list-none items-center rounded-full border border-border px-3 text-sm text-base-text">
              Menu
            </summary>
            <div className="absolute right-4 top-[4.3rem] w-56 rounded-2xl border border-border bg-surface-elevated p-3 shadow-xl md:right-8">
              <div className="grid gap-2">
                {copy.nav.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={localizePath(locale, item.href)}
                    className="rounded-xl px-3 py-2 text-sm text-muted-text transition hover:bg-panel hover:text-base-text"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
