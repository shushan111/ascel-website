import type { LocaleCode, LocalizedString } from "@/types";
import { externalLinks } from "./config";

/**
 * Imported archive content is Russian-first, so a missing Armenian or English
 * field must not render as an empty string. The chain is: the current locale,
 * then Russian (the original), then English.
 */
export function loc(value: LocalizedString, locale: string): string {
  const order: Array<keyof LocalizedString> =
    locale === "hy" ? ["hy", "ru", "en"] : locale === "ru" ? ["ru", "en", "hy"] : ["en", "ru", "hy"];
  for (const key of order) {
    const candidate = value?.[key];
    if (candidate) return candidate;
  }
  return "";
}

/** True when the shown text is not in the requested language. */
export function isFallback(value: LocalizedString, locale: string): boolean {
  const key = locale === "hy" ? "hy" : locale === "ru" ? "ru" : "en";
  return Boolean(loc(value, locale)) && !value?.[key];
}

export function isAppLocale(value: string): value is LocaleCode {
  return value === "en" || value === "hy" || value === "ru";
}

export function getExternalUrl(
  key: keyof typeof externalLinks,
): string | undefined {
  const url = externalLinks[key];
  return url ? url : undefined;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isActiveNavPath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function formatNewsDate(isoDate: string, locale: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  const dateLocale =
    locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-RU" : "en-GB";
  return new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
