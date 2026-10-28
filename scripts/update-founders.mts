/**
 * Writes the five founder profiles in src/sanity/migrations/founders.ts to
 * Sanity and hides the four "Founder 1…4" stand-ins (isActive: false — they
 * are not deleted).
 *
 *   npx tsx --env-file=.env.local scripts/update-founders.mts             # dry run (default)
 *   npx tsx --env-file=.env.local scripts/update-founders.mts --dry-run   # the same, explicitly
 *   npx tsx --env-file=.env.local scripts/update-founders.mts --apply
 *   npx tsx --env-file=.env.local scripts/update-founders.mts --apply --with-existing-photos
 *   npx tsx --env-file=.env.local scripts/update-founders.mts --apply --with-existing-photos --upload-photos .preview/founders
 *
 * Without `--with-existing-photos` no portrait is attached and the page shows
 * initials. With it, the headshots already in the dataset (from the Gyumri
 * Orthopedic School import) are referenced — use only once their reuse is
 * approved. `--upload-photos <dir>` uploads the portraits named in each
 * founder's `photoFile` (Astghik Medical Center, Mikaelyan Institute, the
 * Gyumri Medical Center video) — only once their owners have agreed.
 *
 * Founder documents are created with createIfNotExists semantics on first run
 * and replaced on later runs; the previous state of every touched document is
 * saved to backups/ before writing.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { PLACEHOLDER_FOUNDER_IDS, founderDocument, founderSeeds } from "../src/sanity/migrations/founders";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
if (APPLY && args.includes("--dry-run")) throw new Error("Choose one of --apply and --dry-run");
const WITH_PHOTOS = args.includes("--with-existing-photos");
const uploadIndex = args.indexOf("--upload-photos");
const UPLOAD_DIR = uploadIndex >= 0 ? args[uploadIndex + 1] : undefined;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-28",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});

async function main() {
  console.log(APPLY ? "Mode: APPLY" : "Mode: DRY RUN — nothing will be written");
  console.log(WITH_PHOTOS ? "Portraits: existing dataset assets attached" : "Portraits: no existing assets attached");
  console.log(UPLOAD_DIR ? `Portraits to upload from: ${UPLOAD_DIR}` : "Portraits to upload: none");

  const ids = [...founderSeeds.map((seed) => seed.id), ...PLACEHOLDER_FOUNDER_IDS];
  const existing = await client.fetch<Array<Record<string, unknown> & { _id: string; _rev: string }>>(`*[_id in $ids]`, { ids });
  const byId = new Map(existing.map((doc) => [doc._id, doc]));

  if (WITH_PHOTOS) {
    const refs = founderSeeds.flatMap((seed) => (seed.existingPhotoAsset ? [seed.existingPhotoAsset] : []));
    const found = await client.fetch<string[]>(`*[_id in $refs]._id`, { refs });
    const missing = refs.filter((ref) => !found.includes(ref));
    if (missing.length) throw new Error(`Assets not in the dataset: ${missing.join(", ")}`);
  }

  const uploaded: Record<string, string> = {};
  for (const seed of founderSeeds) {
    if (!UPLOAD_DIR || !seed.photoFile) continue;
    const file = path.join(UPLOAD_DIR, seed.photoFile);
    if (!fs.existsSync(file)) throw new Error(`Missing portrait: ${file}`);
    if (APPLY) {
      const asset = await client.assets.upload("image", fs.createReadStream(file), { filename: `founder-${seed.photoFile}` });
      uploaded[seed.id] = asset._id;
    } else {
      uploaded[seed.id] = `(upload ${seed.photoFile})`;
    }
  }
  const documents = founderSeeds.map((seed) => founderDocument(seed, { withPhotos: WITH_PHOTOS, uploaded }));
  for (const doc of documents) {
    const name = `${doc.firstName.hy} ${doc.lastName.hy} / ${doc.firstName.en} ${doc.lastName.en} / ${doc.firstName.ru} ${doc.lastName.ru}`;
    console.log(`\n${byId.has(doc._id) ? "REPLACE" : "CREATE "} ${doc._id}  (order ${doc.order})\n  ${name}`);
    if ("role" in doc && doc.role) console.log(`  role.hy: ${doc.role.hy}`);
    if ("bio" in doc && doc.bio) console.log(`  bio.hy:  ${doc.bio.hy}`);
    if ("bioExtended" in doc && doc.bioExtended) console.log(`  more.hy: ${doc.bioExtended.hy}`);
    console.log(`  photo:   ${"photo" in doc && doc.photo ? doc.photo.asset._ref : "— (initials)"}`);
    console.log(`  sources: ${doc.sources.map((source) => source.url).join(", ") || "—"}`);
  }
  for (const id of PLACEHOLDER_FOUNDER_IDS) {
    const doc = byId.get(id);
    console.log(`\n${doc ? `HIDE    ${id}  (isActive → false; currently ${String(doc.isActive)})` : `SKIP    ${id}  (not found)`}`);
  }

  if (!APPLY) {
    console.log("\nDry run finished. Re-run with --apply to write these changes.");
    return;
  }

  const backupDir = path.join(process.cwd(), "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const backup = path.join(backupDir, `founders-before-update-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(backup, JSON.stringify(existing, null, 2));
  console.log(`\nBackup: ${backup}`);

  const transaction = client.transaction();
  for (const doc of documents) transaction.createOrReplace(doc);
  for (const id of PLACEHOLDER_FOUNDER_IDS) {
    const doc = byId.get(id);
    if (doc) transaction.patch(id, (patch) => patch.ifRevisionId(doc._rev).set({ isActive: false }));
  }
  await transaction.commit();
  console.log("Written.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
