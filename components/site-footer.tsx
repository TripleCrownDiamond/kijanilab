import Link from "next/link";
import { getDictionary, localizePath } from "@/lib/i18n";
import type { Locale } from "@/data/site-content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);

  return (
    <footer className="mt-24 border-t border-border bg-panel py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl text-base-text">KijaniLab</p>
          <p className="mt-2 max-w-xl text-sm text-muted-text">{copy.footer}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-text">
          {copy.nav.slice(0, 8).map((item) => (
            <Link key={item.href + item.label} href={localizePath(locale, item.href)} className="hover:text-base-text">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
