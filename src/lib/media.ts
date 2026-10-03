import type { Course, GalleryImage } from "@/types";
import { workPhotos } from "@/data/work";

/**
 * The imported course galleries mix two kinds of picture: faculty headshots
 * (small squares from the programme's "Faculty" block) and photographs from
 * the course itself (landscape camera frames). Sanity asset URLs carry the
 * original size ("…-1980x1321.jpg"), which is enough to tell them apart.
 */
export function imageSize(url: string): { width: number; height: number } | null {
  const match = url.match(/-(\d+)x(\d+)\.[a-z]+(?:\?|$)/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}

/** A landscape frame from the event itself, not a headshot. */
export function isEventPhoto(url: string): boolean {
  const size = imageSize(url);
  return Boolean(size && size.width / size.height >= 1.3);
}

export function splitGallery(gallery: GalleryImage[]) {
  return {
    events: gallery.filter((image) => isEventPhoto(image.url)),
    faculty: gallery.filter((image) => !isEventPhoto(image.url)),
  };
}

/**
 * The picture that represents a course: the hand-picked photograph in
 * src/data/work.ts when there is one; else its first event photograph; else its
 * CMS cover when that is a full-size image (the school's archival covers are
 * 750px and up, the headshots used as covers are ~300px); else nothing, and
 * the card shows its typographic tile.
 */
export function courseCover(course: Course): string {
  const curated = Object.values(workPhotos).find((photo) => photo.course === course.slug);
  if (curated) return curated.src;
  const event = course.gallery.find((image) => isEventPhoto(image.url));
  if (event) return event.url;
  const size = course.image ? imageSize(course.image) : null;
  if (size && Math.min(size.width, size.height) >= 750) return course.image;
  return "";
}
