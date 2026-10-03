/**
 * Applies the Armenian fixes in `hy-content-fixes.ts` to the Sanity dataset
 * and to `data/gos/translations/*.json`.
 *
 *   npx tsx scripts/fix-armenian-content.mts            # dry run: prints every change
 *   npx tsx scripts/fix-armenian-content.mts --apply    # writes Sanity + translation files
 *
 * Only `hy` values are touched. Each changed top-level field is written with
 * a single `set` patch guarded by the document's revision, so a document
 * edited in the Studio meanwhile is skipped rather than overwritten.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { capitalise, fixHy, fixRowOrder, isLeftover } from "./hy-content-fixes";

const APPLY = process.argv.includes("--apply");
const log: string[] = [];
let changes = 0;

type Json = unknown;

function blockText(block: Record<string, unknown>): string {
  if (Array.isArray(block.children)) return (block.children as { text?: string }[]).map((c) => c.text ?? "").join("");
  if (typeof block.text === "string") return block.text;
  return "";
}

function record(where: string, before: string, after: string) {
  changes++;
  log.push(`  ${where}\n    − ${before}\n    + ${after}`);
}

/** Fixes one `hy` value: a string, or an array of blocks (Sanity or import format). */
function fixHyValue(value: Json, where: string, opts: { capitaliseFirst?: boolean }): Json {
  if (typeof value === "string") {
    let next = fixHy(value);
    if (opts.capitaliseFirst) next = capitalise(next);
    if (next !== value) record(where, value, next);
    return next;
  }
  if (!Array.isArray(value)) return value;

  const kept: Json[] = [];
  const earlier = new Set<string>();
  value.forEach((raw, index) => {
    const block = raw as Record<string, unknown>;
    const text = blockText(block);
    const reason = isLeftover(text, index, earlier);
    if (reason) {
      changes++;
      log.push(`  ${where}[${index}] REMOVED (${reason})\n    − ${text.slice(0, 160)}`);
      return;
    }
    if (text.trim()) earlier.add(text.replace(/\s+/g, " ").trim());

    const copy: Record<string, unknown> = { ...block };
    const capFirst = opts.capitaliseFirst && kept.length === 0;
    if (Array.isArray(copy.children)) {
      copy.children = (copy.children as Record<string, unknown>[]).map((child, ci) => {
        if (typeof child.text !== "string") return child;
        let next = fixHy(child.text);
        if (capFirst && ci === 0) next = capitalise(next);
        if (next !== child.text) record(`${where}[${index}]`, child.text, next);
        return { ...child, text: next };
      });
    } else if (typeof copy.text === "string") {
      let next = fixHy(copy.text);
      if (capFirst) next = capitalise(next);
      if (next !== copy.text) record(`${where}[${index}]`, copy.text, next);
      copy.text = next;
    }
    if (Array.isArray(copy.items)) {
      copy.items = (copy.items as unknown[]).map((item) => (typeof item === "string" ? fixHy(item) : item));
    }
    if (Array.isArray(copy.rows)) {
      // Sanity rows are { cells: string[] }; import rows are string[].
      const sanityRows = copy.rows.length > 0 && !Array.isArray(copy.rows[0]);
      let rows = (copy.rows as unknown[]).map((row) => {
        const cells = sanityRows ? ((row as { cells: string[] }).cells ?? []) : (row as string[]);
        const fixed = cells.map((cell) => {
          const next = fixHy(cell);
          if (next !== cell) record(`${where}[${index}] table`, cell, next);
          return next;
        });
        return sanityRows ? { ...(row as object), cells: fixed } : fixed;
      });
      const reordered = fixRowOrder(rows, (row) =>
        sanityRows ? ((row as { cells: string[] }).cells[0] ?? "") : ((row as string[])[0] ?? ""),
      );
      for (const swap of reordered.swapped) {
        changes++;
        log.push(`  ${where}[${index}] table ROWS SWAPPED  ${swap}`);
      }
      rows = reordered.rows;
      copy.rows = rows;
    }
    kept.push(copy);
  });
  return kept;
}

/** Walks any structure and fixes every `hy` value found. */
function walk(node: Json, where: string, parentKey = ""): Json {
  if (Array.isArray(node)) return node.map((item, i) => walk(item, `${where}[${i}]`, parentKey));
  if (!node || typeof node !== "object") return node;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === "hy") {
      // Course descriptions (and the matching first body paragraph) start lowercase.
      const capitaliseFirst = parentKey === "description" || parentKey === "body";
      out[key] = fixHyValue(value, `${where}.hy`, { capitaliseFirst });
    } else if (key.startsWith("_") || key === "asset") {
      out[key] = value;
    } else {
      out[key] = walk(value, where ? `${where}.${key}` : key, key);
    }
  }
  return out;
}

// ---------------------------------------------------------------- Sanity

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-28",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const docs: Record<string, unknown>[] = await client.fetch(
  `*[_type in ["program","course","news","event","founder","programProfile"] && !(_id in path("drafts.**"))]`,
);

let docsChanged = 0;
for (const doc of docs) {
  const id = String(doc._id);
  const before = changes;
  log.push(`\n■ Sanity ${id}`);
  const fixed = walk(doc, "") as Record<string, unknown>;
  const set: Record<string, unknown> = {};
  for (const key of Object.keys(doc)) {
    if (key.startsWith("_")) continue;
    if (JSON.stringify(doc[key]) !== JSON.stringify(fixed[key])) set[key] = fixed[key];
  }
  if (changes === before) {
    log.pop();
    continue;
  }
  docsChanged++;
  if (APPLY) await client.patch(id).ifRevisionId(String(doc._rev)).set(set).commit();
}

// ---------------------------------------------------- translation files

const dir = path.join(process.cwd(), "data", "gos", "translations");
let filesChanged = 0;
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_"))) {
  const full = path.join(dir, file);
  const original = JSON.parse(fs.readFileSync(full, "utf8"));
  const before = changes;
  log.push(`\n■ File data/gos/translations/${file}`);
  // `notes` document the translation itself and are not site content.
  const { notes, ...rest } = original;
  const fixed = { ...(walk(rest, "") as object), notes };
  const ordered = Object.fromEntries(Object.keys(original).map((k) => [k, (fixed as Record<string, unknown>)[k]]));
  if (changes === before) {
    log.pop();
    continue;
  }
  filesChanged++;
  if (APPLY) fs.writeFileSync(full, JSON.stringify(ordered, null, 2) + "\n");
}

// ------------------------------------------- parallel-source news items
// A few news items already had Armenian on the original page; the import
// reads their `body.hy` straight from `data/gos/<slug>.json` instead of a
// translation file. Text fixes only — blocks are never removed here, because
// `omitBlocks` in the translation file refers to them by index.
for (const file of fs.readdirSync(path.join(process.cwd(), "data", "gos")).filter((f) => f.endsWith(".json") && !f.startsWith("_"))) {
  const full = path.join(process.cwd(), "data", "gos", file);
  const source = JSON.parse(fs.readFileSync(full, "utf8"));
  if (!source.parallel || !Array.isArray(source.body?.hy)) continue;
  const before = changes;
  log.push(`\n■ Parallel source data/gos/${file}`);
  source.body.hy = source.body.hy.map((block: Record<string, unknown>, i: number) => {
    if (typeof block.text !== "string") return block;
    const next = fixHy(block.text);
    if (next !== block.text) record(`body.hy[${i}]`, block.text, next);
    return { ...block, text: next };
  });
  if (changes === before) {
    log.pop();
    continue;
  }
  filesChanged++;
  if (APPLY) fs.writeFileSync(full, JSON.stringify(source, null, 2) + "\n");
}

console.log(log.join("\n"));
console.log(
  `\n${APPLY ? "APPLIED" : "DRY RUN"}: ${changes} changes — ${docsChanged} Sanity documents, ${filesChanged} translation files.`,
);
