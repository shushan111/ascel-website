import { founderDocument, founderSeeds } from "@/sanity/migrations/founders";
import type { SanityFounderDocument } from "@/sanity/lib/mapFounder";

/**
 * Local review of the founder profiles before anything is written to Sanity.
 * Active only under `next dev` with FOUNDERS_PREVIEW=1 (set in
 * .env.development.local, which is git-ignored and never read by a build).
 *
 * Portraits: the two already in the dataset are referenced as they would be
 * with `--with-existing-photos`; the three awaiting their owners' permission
 * are served from .preview/founders by the dev-only /preview-media route.
 * None of them reaches production without approval.
 */
const enabled = process.env.NODE_ENV === "development" && process.env.FOUNDERS_PREVIEW === "1";

export function applyFoundersPreview(documents: SanityFounderDocument[]): SanityFounderDocument[] {
  if (!enabled) return documents;
  return founderSeeds.map((seed) => {
    const doc = founderDocument(seed, { withPhotos: true }) as unknown as SanityFounderDocument;
    if (!seed.photoFile) return doc;
    return {
      ...doc,
      photo: { asset: { url: `/preview-media/founders/${seed.photoFile}` }, credit: seed.photoCredit ?? null },
    } as SanityFounderDocument;
  });
}
