import type { GalleryImage, LocalizedString, PortableBlock } from "@/types";
import { urlFor } from "./image";

export type SanityLocalizedValue = {
  ru?: string | null;
  hy?: string | null;
  en?: string | null;
};

export type SanityImage = {
  asset?: { _id?: string; url?: string } | null;
  alt?: SanityLocalizedValue | null;
  hotspot?: unknown;
  crop?: unknown;
} | null;

export function toLocalizedString(
  value: SanityLocalizedValue | null | undefined,
): LocalizedString {
  return {
    ru: value?.ru ?? "",
    hy: value?.hy ?? "",
    en: value?.en ?? "",
  };
}

export function imageUrl(image: SanityImage, fallback: string, width = 1600, height = 1000): string {
  if (!image?.asset?._id) return fallback;
  return urlFor(image).width(width).height(height).fit("crop").url();
}

export function mapGallery(images: SanityImage[] | null | undefined): GalleryImage[] {
  return (images ?? [])
    .filter((image): image is NonNullable<SanityImage> => Boolean(image?.asset?._id))
    .map((image) => ({
      url: urlFor(image).width(1600).height(1067).fit("crop").url(),
      alt: toLocalizedString(image.alt),
    }));
}

type SanityLocalizedPortable = {
  ru?: PortableBlock[] | null;
  hy?: PortableBlock[] | null;
  en?: PortableBlock[] | null;
} | null;

export function mapRichBody(body: SanityLocalizedPortable) {
  return {
    ru: body?.ru ?? undefined,
    hy: body?.hy ?? undefined,
    en: body?.en ?? undefined,
  };
}
