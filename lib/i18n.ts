import { dictionary, locales, type Locale } from "@/data/site-content";

export const defaultLocale: Locale = "fr";

export const isLocale = (value: string): value is Locale => {
  return (locales as readonly string[]).includes(value);
};

export const getDictionary = (locale: string) => {
  if (!isLocale(locale)) {
    return dictionary[defaultLocale];
  }
  return dictionary[locale];
};

export const localizePath = (locale: Locale, href: string) => {
  if (!href) {
    return `/${locale}`;
  }
  return `/${locale}${href}`;
};
