import type { Course, CoursePhoto, FacultyMember } from "@/types";
import { urlFor } from "./image";
import {
  hasAsset,
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
  recap?: { ru?: PortableBlock[] | null; hy?: PortableBlock[] | null; en?: PortableBlock[] | null } | null;
  highlights?: SanityLocalizedValue[] | null;
  faculty?: Array<{
    name?: SanityLocalizedValue;
    credentials?: SanityLocalizedValue;
    bio?: SanityLocalizedValue;
    photo?: SanityImage;
  }> | null;
  eventPhotos?: Array<NonNullable<SanityImage> & { caption?: SanityLocalizedValue; credit?: string | null }> | null;
};

/**
 * Event photographs keep their own proportions (`fit("max")`): the grid crops
 * its thumbnails, the viewer shows the whole frame. A photo whose asset is a
 * root-relative URL is a local preview file (src/data/coursePreview.ts).
 */
function mapEventPhotos(photos: SanityCourseDocument["eventPhotos"]): CoursePhoto[] {
  return (photos ?? []).flatMap((photo) => {
    const local = photo.asset?.url?.startsWith("/") ? photo.asset.url : "";
    const url = hasAsset(photo) ? urlFor(photo).width(2000).fit("max").url() : local;
    if (!url) return [];
    const dimensions = photo.asset?.metadata?.dimensions;
    return [
      {
        url,
        width: dimensions?.width ?? undefined,
        height: dimensions?.height ?? undefined,
        alt: toLocalizedString(photo.alt),
        caption: toLocalizedString(photo.caption),
        credit: photo.credit ?? "",
      },
    ];
  });
}

function mapFaculty(faculty: SanityCourseDocument["faculty"]): FacultyMember[] {
  return (faculty ?? []).map((member) => ({
    name: toLocalizedString(member.name),
    credentials: toLocalizedString(member.credentials),
    bio: toLocalizedString(member.bio),
    photo: imageUrl(member.photo ?? null, "", 320, 320),
  }));
}

// No stock fallback: a course without a photograph renders a typographic
// tile (MediaFallback) rather than an image that is not of that course.
const fallbackCourseImage = "";

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
    recap: mapRichBody(doc.recap ?? null),
    highlights: (doc.highlights ?? []).map(toLocalizedString),
    faculty: mapFaculty(doc.faculty),
    eventPhotos: mapEventPhotos(doc.eventPhotos),
    sourceUrl: doc.sourceUrl ?? "",
    registrationUrl: doc.registrationUrl ?? "",
    isPlaceholder: false,
  };
}
