import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hy", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];

export function localePrefixedPath(path: string, locale: string): string {
  const normalized = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
