/**
 * Applies the content update in src/sanity/migrations/footankle2026.ts to the
 * course document gos-course-footankle2026.
 *
 *   npx tsx --env-file=.env.local scripts/update-footankle2026.mts             # dry run (default)
 *   npx tsx --env-file=.env.local scripts/update-footankle2026.mts --dry-run   # the same, explicitly
 *   npx tsx --env-file=.env.local scripts/update-footankle2026.mts --apply
 *   npx tsx --env-file=.env.local scripts/update-footankle2026.mts --apply --photos <dir>
 *
 * Without `--photos` the event photographs are left out entirely: they may be
 * uploaded only once the rights holder has agreed. `<dir>` must hold the files
 * named in footankleContent.eventPhotos (12.jpg, 06.jpg, …).
 *
 * The write is one `set` patch guarded by the revision that was read, so a
 * document edited in the Studio in the meantime is not overwritten. The
 * previous document is saved to backups/ before anything is written.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  FOOTANKLE_ID,
  buildFootanklePatch,
  eventPhotoFields,
  footankleContent,
  type CourseDocLike,
} from "../src/sanity/migrations/footankle2026";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
if (APPLY && args.includes("--dry-run")) throw new Error("Choose one of --apply and --dry-run");
const photosIndex = args.indexOf("--photos");
const PHOTOS_DIR = photosIndex >= 0 ? args[photosIndex + 1] : undefined;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-28",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});

function summarise(value: unknown, depth = 0): string {
  const pad = "  ".repeat(depth);
  if (Array.isArray(value)) {
    return value.map((item) => `${pad}- ${summarise(item, depth + 1).trimStart()}`).join("\n");
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (record._type === "block") {
      const text = ((record.children as Array<{ text?: string }>) ?? []).map((c) => c.text ?? "").join("");
      return `${pad}[${record.style ?? "normal"}] ${text}`;
    }
    if (record._type === "contentTable") {
      const rows = (record.rows as Array<{ cells?: string[] }>) ?? [];
      return `${pad}[table, ${rows.length} rows: ${rows[0]?.cells?.[0] ?? ""} … ${rows.at(-1)?.cells?.[0] ?? ""}]`;
    }
    if (record._type === "reference") return `${pad}→ ${record._ref}`;
    return Object.entries(record)
      .filter(([key]) => key !== "_type" && key !== "_key")
      .map(([key, item]) =>
        item && typeof item === "object" ? `${pad}${key}:\n${summarise(item, depth + 1)}` : `${pad}${key}: ${String(item)}`,
      )
      .join("\n");
  }
  return `${pad}${String(value)}`;
}

async function uploadPhotos(dir: string) {
  return Promise.all(
    footankleContent.eventPhotos.map(async (photo, index) => {
      const file = path.join(dir, photo.file);
      if (!fs.existsSync(file)) throw new Error(`Missing photo: ${file}`);
      const asset = await client.assets.upload("image", fs.createReadStream(file), {
        filename: `footankle2026-${photo.file}`,
      });
      return {
        _type: "image",
        _key: `p${index}`,
        asset: { _type: "reference", _ref: asset._id },
        ...eventPhotoFields(index),
      };
    }),
  );
}

async function main() {
  const doc = await client.getDocument(FOOTANKLE_ID);
  if (!doc) throw new Error(`${FOOTANKLE_ID} not found`);
  console.log(`${FOOTANKLE_ID} rev ${doc._rev}, updated ${doc._updatedAt}`);
  console.log(APPLY ? "Mode: APPLY" : "Mode: DRY RUN — nothing will be written");
  console.log(PHOTOS_DIR ? `Event photos: from ${PHOTOS_DIR}` : "Event photos: not included (no --photos)");

  if (PHOTOS_DIR && !APPLY) {
    for (const photo of footankleContent.eventPhotos) {
      if (!fs.existsSync(path.join(PHOTOS_DIR, photo.file))) throw new Error(`Missing photo: ${photo.file}`);
    }
  }
  const eventPhotos = PHOTOS_DIR
    ? APPLY
      ? await uploadPhotos(PHOTOS_DIR)
      : footankleContent.eventPhotos.map((photo, index) => ({
          _type: "image",
          asset: { _type: "reference", _ref: `(upload ${photo.file})` },
          ...eventPhotoFields(index),
        }))
    : undefined;

  const patch = buildFootanklePatch(doc as unknown as CourseDocLike, eventPhotos);

  for (const [field, value] of Object.entries(patch)) {
    console.log(`\n=== set ${field}`);
    const before = field.split(".").reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], doc);
    if (before !== undefined) console.log(`--- before\n${summarise(before, 1)}`);
    console.log(`+++ after\n${summarise(value, 1)}`);
  }

  if (!APPLY) {
    console.log("\nDry run finished. Re-run with --apply to write these changes.");
    return;
  }

  const backupDir = path.join(process.cwd(), "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const backup = path.join(backupDir, `footankle2026-before-update-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(backup, JSON.stringify(doc, null, 2));
  console.log(`\nBackup: ${backup}`);

  await client.patch(FOOTANKLE_ID).ifRevisionId(doc._rev).set(patch).commit();
  console.log("Written.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
