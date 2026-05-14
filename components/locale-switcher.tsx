"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/data/site-content";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(fr|en)/, "") || "";

  return (
    <div className="inline-flex rounded-full border border-border bg-panel p-1">
      {locales.map((item) => {
        const href = `/${item}${suffix}`;
        const active = item === locale;

        return (
          <Link
            key={item}
            href={href}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] transition ${
              active ? "bg-accent text-[#03260c]" : "text-muted-text hover:text-base-text"
            }`}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}
