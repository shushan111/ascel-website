/**
 * Restores documents from a backup written before a content migration.
 *
 *   npx tsx scripts/restore-sanity-backup.mts backups/sanity-hy-fix-<date>.json            # dry run
 *   npx tsx scripts/restore-sanity-backup.mts backups/sanity-hy-fix-<date>.json --apply
 *
 * Each document is written back whole with createOrReplace.
 */
import fs from "node:fs";
import { createClient } from "@sanity/client";

const [file] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!file) throw new Error("usage: restore-sanity-backup.mts <backup.json> [--apply]");
const docs: { _id: string }[] = JSON.parse(fs.readFileSync(file, "utf8"));
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-28",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
if (process.argv.includes("--apply")) {
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc as never);
  await tx.commit();
  console.log(`Restored ${docs.length} documents from ${file}.`);
} else {
  console.log(`Would restore ${docs.length} documents from ${file}. Re-run with --apply.`);
}
