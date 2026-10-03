import type { Founder } from "@/types";
import { loc } from "@/lib/utils";

/** First and last name in the requested language, with the site's fallback. */
export function founderName(founder: Founder, locale: string): string {
  return [loc(founder.firstName, locale), loc(founder.lastName, locale)]
    .filter(Boolean)
    .join(" ");
}

/**
 * The Studio holds four stand-in entries ("Founder 1" … "Founder 4") until the
 * client sends real names and portraits. A stand-in is never rendered: an
 * anonymous face on a trust page does more harm than an absent section.
 */
export function isPlaceholderFounder(founder: Founder): boolean {
  const first = (founder.firstName.en ?? founder.firstName.ru ?? "").trim();
  const last = (founder.lastName.en ?? founder.lastName.ru ?? "").trim();
  return /^founder$/i.test(first) || /^\d+$/.test(last);
}
