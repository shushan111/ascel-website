import type { Founder } from "@/types";
import {
  toLocalizedString,
  type SanityImage,
  type SanityLocalizedValue,
} from "./mapShared";
import { urlFor } from "./image";

export type SanityFounderDocument = {
  _id: string;
  firstName?: SanityLocalizedValue | null;
  lastName?: SanityLocalizedValue | null;
  role?: SanityLocalizedValue | null;
  bio?: SanityLocalizedValue | null;
  bioExtended?: SanityLocalizedValue | null;
  photo?: (NonNullable<SanityImage> & { alt?: SanityLocalizedValue | null; credit?: string | null }) | null;
};

/** True when the localized value carries text in at least one language. */
function hasText(value: SanityLocalizedValue | null | undefined): boolean {
  return Boolean(value?.ru || value?.hy || value?.en);
}

/**
 * Sanity resizes and re-encodes on delivery, so every profile gets the same
 * 4:5 frame at a sensible weight whatever was uploaded. A root-relative URL is
 * a local preview file (src/data/foundersPreview.ts).
 */
function founderPhotoUrl(photo: SanityFounderDocument["photo"]): string {
  const asset = photo?.asset as { _id?: string; _ref?: string; url?: string } | null | undefined;
  if (asset?._id || asset?._ref) return urlFor(photo!).width(800).height(1000).fit("crop").auto("format").url();
  return asset?.url?.startsWith("/") ? asset.url : "";
}

export function mapSanityFounder(doc: SanityFounderDocument): Founder {
  return {
    id: doc._id,
    firstName: toLocalizedString(doc.firstName),
    lastName: toLocalizedString(doc.lastName),
    role: hasText(doc.role) ? toLocalizedString(doc.role) : undefined,
    bio: hasText(doc.bio) ? toLocalizedString(doc.bio) : undefined,
    bioExtended: hasText(doc.bioExtended) ? toLocalizedString(doc.bioExtended) : undefined,
    photo: founderPhotoUrl(doc.photo),
    photoAlt: hasText(doc.photo?.alt) ? toLocalizedString(doc.photo?.alt) : undefined,
    photoCredit: doc.photo?.credit || undefined,
  };
}
