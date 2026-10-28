import {
  FOOTANKLE_ID,
  buildFootanklePatch,
  eventPhotoFields,
  footankleContent,
  type CourseDocLike,
} from "@/sanity/migrations/footankle2026";

/**
 * Local review of a pending content update, before anything is written to
 * Sanity. Active only under `next dev` with COURSE_PREVIEW=footankle2026 (set
 * in .env.development.local, which is git-ignored and never read by a build).
 * The event photographs are served from .preview/footankle2026 (outside public/,
 * git-ignored) by src/app/preview-media in dev only: they may not be published
 * until the rights are cleared.
 */
const mode = process.env.NODE_ENV === "development" ? process.env.COURSE_PREVIEW : undefined;
const enabled = mode === "footankle2026" || mode === "footankle2026-nophotos";
// "footankle2026-nophotos": the update as it would publish before the photo
// rights are cleared (text, faculty and structure only).
const withPhotos = mode === "footankle2026";

// Pixel sizes of the preview files (the AnklePro originals).
const previewSizes: Record<string, [number, number]> = {
  "05.jpg": [1223, 1964],
  "06.jpg": [1024, 768],
  "07.jpg": [600, 1032],
  "08.jpg": [600, 1036],
  "09.jpg": [600, 1099],
  "10.jpg": [1024, 768],
  "11.jpg": [1024, 768],
  "12.jpg": [1024, 768],
  "13.jpg": [1024, 768],
};

function setPath(target: Record<string, unknown>, path: string, value: unknown) {
  const [head, ...rest] = path.split(".");
  if (!rest.length) {
    target[head] = value;
    return;
  }
  const child = { ...((target[head] as Record<string, unknown>) ?? {}) };
  setPath(child, rest.join("."), value);
  target[head] = child;
}

export function applyCoursePreview<T extends { _id: string }>(doc: T): T {
  if (!enabled || doc._id !== FOOTANKLE_ID) return doc;

  const eventPhotos = footankleContent.eventPhotos.map((photo, index) => {
    const [width, height] = previewSizes[photo.file] ?? [];
    return {
      _type: "image",
      _key: `p${index}`,
      asset: { url: `/preview-media/footankle2026/${photo.file}`, metadata: { dimensions: { width, height } } },
      ...eventPhotoFields(index),
    };
  });

  const patch = buildFootanklePatch(doc as unknown as CourseDocLike, withPhotos ? eventPhotos : undefined);
  const next = { ...doc } as Record<string, unknown>;
  for (const [path, value] of Object.entries(patch)) setPath(next, path, value);
  return next as T;
}
