import type { LocaleCode, LocalizedString } from "@/types";
import { externalLinks } from "./config";

export function loc(value: LocalizedString, locale: string): string {
  return locale === "hy" ? value.hy : value.en;
}

export function isAppLocale(value: string): value is LocaleCode {
  return value === "en" || value === "hy";
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

export function formatNewsDate(isoDate: string, locale: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "hy" ? "hy-AM" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
