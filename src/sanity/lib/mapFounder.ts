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
  photo?: SanityImage;
};

/** True when the localized value carries text in at least one language. */
function hasText(value: SanityLocalizedValue | null | undefined): boolean {
  return Boolean(value?.ru || value?.hy || value?.en);
}

export function mapSanityFounder(doc: SanityFounderDocument): Founder {
  return {
    id: doc._id,
    firstName: toLocalizedString(doc.firstName),
    lastName: toLocalizedString(doc.lastName),
    role: hasText(doc.role) ? toLocalizedString(doc.role) : undefined,
    bio: hasText(doc.bio) ? toLocalizedString(doc.bio) : undefined,
    // Sanity resizes and re-encodes on delivery, so every card gets the same
    // 4:5 frame at a sensible weight whatever was uploaded.
    photo: urlFor(doc.photo!).width(800).height(1000).fit("crop").auto("format").url(),
  };
}
