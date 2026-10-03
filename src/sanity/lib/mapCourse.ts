import type { Course } from "@/types";
import {
  imageUrl,
  mapGallery,
  mapRichBody,
  toLocalizedString,
  type SanityImage,
  type SanityLocalizedValue,
} from "./mapShared";
import type { PortableBlock } from "@/types";

type SanityCourseDocument = {
  _id: string;
  slug?: string | null;
  status?: "upcoming" | "past" | null;
  title: SanityLocalizedValue;
  type: SanityLocalizedValue;
  date: SanityLocalizedValue;
  location: SanityLocalizedValue;
  instructor: SanityLocalizedValue;
  description: SanityLocalizedValue;
  registrationUrl?: string | null;
  sourceUrl?: string | null;
  body?: { ru?: PortableBlock[] | null; hy?: PortableBlock[] | null; en?: PortableBlock[] | null } | null;
  image?: SanityImage;
  gallery?: SanityImage[] | null;
};

const fallbackCourseImage = "/images/capability-simulation.webp";

export function mapSanityCourse(doc: SanityCourseDocument): Course {
  return {
    id: doc._id,
    // Imported courses carry a slug; the few hand-authored ones predate it and
    // fall back to the document id so existing links keep resolving.
    slug: doc.slug ?? doc._id,
    status: doc.status ?? "past",
    title: toLocalizedString(doc.title),
    date: toLocalizedString(doc.date),
    location: toLocalizedString(doc.location),
    type: toLocalizedString(doc.type),
    instructor: toLocalizedString(doc.instructor),
    description: toLocalizedString(doc.description),
    image: imageUrl(doc.image ?? null, fallbackCourseImage),
    imageAlt: toLocalizedString(doc.image?.alt),
    gallery: mapGallery(doc.gallery),
    body: mapRichBody(doc.body ?? null),
    sourceUrl: doc.sourceUrl ?? "",
    registrationUrl: doc.registrationUrl ?? "",
    isPlaceholder: false,
  };
}
