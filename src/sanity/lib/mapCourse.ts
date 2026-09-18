import type { Course, LocalizedString } from "@/types";
import { urlFor } from "./image";

type SanityLocalizedValue = {
  en?: string;
  hy?: string;
  ru?: string;
};

type SanityCourseDocument = {
  _id: string;
  title: SanityLocalizedValue;
  type: SanityLocalizedValue;
  date: SanityLocalizedValue;
  location: SanityLocalizedValue;
  instructor: SanityLocalizedValue;
  description: SanityLocalizedValue;
  registrationUrl?: string | null;
  image?: {
    asset?: { _id?: string; url?: string } | null;
    hotspot?: unknown;
    crop?: unknown;
  };
};

const fallbackCourseImage = "/images/capability-simulation.webp";

function toLocalizedString(value: SanityLocalizedValue | null | undefined): LocalizedString {
  return {
    en: value?.en ?? "",
    hy: value?.hy ?? "",
    ru: value?.ru ?? "",
  };
}

function buildImageUrl(image: SanityCourseDocument["image"]): string {
  if (!image?.asset?._id) return fallbackCourseImage;

  return urlFor(image).width(1600).height(1000).fit("crop").url();
}

export function mapSanityCourse(doc: SanityCourseDocument): Course {
  return {
    id: doc._id,
    slug: doc._id,
    title: toLocalizedString(doc.title),
    date: toLocalizedString(doc.date),
    location: toLocalizedString(doc.location),
    type: toLocalizedString(doc.type),
    instructor: toLocalizedString(doc.instructor),
    description: toLocalizedString(doc.description),
    image: buildImageUrl(doc.image),
    registrationUrl: doc.registrationUrl ?? "",
    isPlaceholder: false,
  };
}
