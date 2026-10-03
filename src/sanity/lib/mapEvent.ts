import type { EventItem, LocalizedString } from "@/types";
import { eventDateToDisplayParts } from "@/sanity/lib/studioEventDate";

type SanityLocalizedValue = {
  en?: string;
  hy?: string;
  ru?: string;
};

export type SanityEventDocument = {
  _id: string;
  title: SanityLocalizedValue;
  date?: string;
  month?: SanityLocalizedValue;
  day?: string;
  location: SanityLocalizedValue;
  description: SanityLocalizedValue;
  href: string;
};

function toLocalizedString(value: SanityLocalizedValue | null | undefined): LocalizedString {
  return {
    en: value?.en ?? "",
    hy: value?.hy ?? "",
    ru: value?.ru ?? "",
  };
}

function resolveEventDisplayDate(doc: SanityEventDocument): {
  month: LocalizedString;
  day: string;
} {
  if (doc.date) {
    return eventDateToDisplayParts(doc.date);
  }

  return {
    month: toLocalizedString(doc.month),
    day: doc.day ?? "",
  };
}

export function mapSanityEvent(doc: SanityEventDocument): EventItem {
  const { month, day } = resolveEventDisplayDate(doc);

  return {
    id: doc._id,
    slug: doc._id,
    title: toLocalizedString(doc.title),
    month,
    day,
    location: toLocalizedString(doc.location),
    description: toLocalizedString(doc.description),
    href: doc.href,
    isPlaceholder: false,
  };
}
