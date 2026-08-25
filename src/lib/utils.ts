import type { LocaleCode, LocalizedString } from "@/types";
import { externalLinks } from "./config";

export function loc(value: LocalizedString, locale: string): string {
  if (locale === "hy") return value.hy;
  if (locale === "ru") return value.ru;
  return value.en;
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
