import type { Founder } from "@/types";
import { loc } from "@/lib/utils";

/** First and last name in the requested language, with the site's fallback. */
export function founderName(founder: Founder, locale: string): string {
  return [loc(founder.firstName, locale), loc(founder.lastName, locale)]
    .filter(Boolean)
    .join(" ");
}
