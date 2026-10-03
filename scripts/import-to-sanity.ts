/**
 * Phase 4 — import.
 *
 * Loads ./data/gos/<slug>.json plus its translation overlay into Sanity, with
 * the images uploaded as assets and attached to their item.
 *
 * Idempotent by construction: every document id is `gos-<kind>-<slug>` and is
 * written with `createOrReplace`, and every asset is looked up by the SHA-1 of
 * its bytes before being uploaded, so a second run creates nothing new.
 *
 *   npx tsx scripts/import-to-sanity.ts --dry-run
 *   npx tsx scripts/import-to-sanity.ts --dry-run --only footankle2026
 *   npx tsx scripts/import-to-sanity.ts --only footankle2026,lowerext2025
 *   npx tsx scripts/import-to-sanity.ts               # everything translated
 */
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { createClient } from "@sanity/client";

import type { Block } from "./gos/tilda";
import { firstParagraph, toPortableText, type PortableBlock } from "./gos/portable";

type Lang = "hy" | "ru" | "en";
const LANGS: Lang[] = ["ru", "hy", "en"];

const DATA_DIR = path.join(process.cwd(), "data", "gos");
const TRANSLATIONS_DIR = path.join(DATA_DIR, "translations");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const ONLY = (() => {
  const i = args.indexOf("--only");
  return i >= 0 ? args[i + 1]?.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
})();

// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET");
  process.exit(1);
}
if (!token && !DRY_RUN) {
  console.error("Missing SANITY_API_WRITE_TOKEN — required for a real import");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-28",
  token,
  useCdn: false,
});

// ---------------------------------------------------------------------------

interface SourceItem {
  slug: string;
  kind: "course" | "news";
  status?: "upcoming" | "past";
  sourceUrl: string;
  date: { iso: string | null; raw: string };
  title: Partial<Record<Lang, string>>;
  blocks: Array<Block & { lang: Lang }>;
  body: Partial<Record<Lang, Block[]>>;
  parallel: boolean;
  images: Array<{ order: number; file: string; width: number; height: number }>;
}

interface Translation {
  title?: Partial<Record<Lang, string>>;
  dateDisplay?: Partial<Record<Lang, string>>;
  body?: Partial<Record<Lang, Block[]>>;
  omitBlocks?: number[];
  omitTableColumns?: Record<string, number[]>;
  notes?: string[];
}

function stripBlock(block: Block, omitColumns?: number[]): Block {
  if (block.type !== "table" || !omitColumns?.length) return block;
  return {
    ...block,
    rows: block.rows.map((row) => row.filter((_, i) => !omitColumns.includes(i))),
  };
}

/** Applies the editorial omissions recorded in the translation overlay. */
function applyOmissions(blocks: Block[], tr: Translation): Block[] {
  const omitBlocks = new Set(tr.omitBlocks ?? []);
  return blocks
    .map((block, index) => {
      if (omitBlocks.has(index)) return null;
      return stripBlock(block, tr.omitTableColumns?.[String(index)]);
    })
    .filter((b): b is Block => b !== null);
}

function localizedString(values: Partial<Record<Lang, string>>) {
  const out: Record<string, string> = {};
  for (const lang of LANGS) {
    const value = values[lang]?.trim();
    if (value) out[lang] = value;
  }
  return out;
}

// --- assets ----------------------------------------------------------------

/**
 * Sanity derives an asset's document id from the SHA-1 of its bytes, so the
 * same file uploaded twice resolves to the same asset. Checking first turns a
 * re-run into a lookup instead of an upload.
 */
async function uploadImage(file: string, filename: string): Promise<string | null> {
  const bytes = await readFile(path.join(DATA_DIR, file));
  const sha = createHash("sha1").update(bytes).digest("hex");

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && sha1hash == $sha][0]{_id}`,
    { sha },
  );
  if (existing?._id) return existing._id;

  if (DRY_RUN) return null;

  const asset = await client.assets.upload("image", bytes, {
    filename,
    contentType: filename.endsWith(".png")
      ? "image/png"
      : filename.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg",
  });
  return asset._id;
}

function imageField(assetId: string, alt: Record<string, string>) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt: { _type: "localizedString", ...alt },
  };
}

// --- document builders -----------------------------------------------------

/**
 * `omitBlocks` indexes the document-order list. On a trilingual page each
 * language is a slice of that list, so the indices are translated into
 * per-segment positions before being applied.
 */
function omissionsForSegment(source: SourceItem, tr: Translation, lang: Lang): number[] {
  const omit = new Set(tr.omitBlocks ?? []);
  if (!omit.size) return [];
  const out: number[] = [];
  let seen = 0;
  source.blocks.forEach((block, index) => {
    if (block.lang !== lang) return;
    if (omit.has(index)) out.push(seen);
    seen += 1;
  });
  return out;
}

function resolveBlocks(source: SourceItem, tr: Translation, lang: Lang): Block[] | undefined {
  const raw = tr.body?.[lang] ?? (source.parallel ? source.body[lang] : undefined);
  if (!raw?.length) return undefined;
  if (!source.parallel) return applyOmissions(raw, tr);
  const drop = new Set(omissionsForSegment(source, tr, lang));
  return raw.filter((_, i) => !drop.has(i));
}

function buildBodies(source: SourceItem, tr: Translation) {
  const bodies: Record<string, PortableBlock[]> = {};

  for (const lang of LANGS) {
    const blocks = resolveBlocks(source, tr, lang);
    if (!blocks?.length) continue;
    bodies[lang] = toPortableText(blocks, `${lang}-`);
  }

  return bodies;
}

function buildExcerpts(source: SourceItem, tr: Translation) {
  const out: Record<string, string> = {};
  for (const lang of LANGS) {
    const blocks = resolveBlocks(source, tr, lang);
    if (!blocks?.length) continue;
    const text = firstParagraph(blocks);
    if (text) out[lang] = text;
  }
  return out;
}

async function buildImages(source: SourceItem, title: Record<string, string>) {
  const assets: Array<{ id: string; file: string } | null> = [];
  for (const image of source.images) {
    const id = await uploadImage(image.file, path.basename(image.file));
    assets.push(id ? { id, file: image.file } : null);
  }
  const usable = assets.filter((a): a is { id: string; file: string } => a !== null);
  const [main, ...rest] = usable;
  return {
    main: main ? imageField(main.id, title) : null,
    gallery: rest.map((a, i) => ({ ...imageField(a.id, title), _key: `g${i}` })),
    uploaded: usable.length,
    total: source.images.length,
  };
}

const KIND_LABEL = {
  seminar: { ru: "Семинар", hy: "Սեմինար", en: "Seminar" },
  course: { ru: "Курс", hy: "Դասընթաց", en: "Course" },
};

/** The source calls a few of these a seminar rather than a course. */
function kindLabel(source: SourceItem, tr: Translation) {
  const text = [
    ...Object.values(tr.title ?? {}),
    ...(tr.body?.ru ?? []).slice(0, 2).map((b) => ("text" in b ? b.text : "")),
  ]
    .join(" ")
    .toLowerCase();
  return /семинар|seminar|սեմինար/.test(text) ? KIND_LABEL.seminar : KIND_LABEL.course;
}

/**
 * The venue line is the paragraph that pairs a date with a place, e.g.
 * "2-3 октября 2026 / Гюмри / Комплекс Лорке". Using it verbatim keeps the
 * location honest instead of assuming every course was held in Gyumri.
 */
function venueLine(blocks: Block[] | undefined): string {
  for (const block of (blocks ?? []).slice(0, 4)) {
    if (!("text" in block)) continue;
    if (block.text.includes("/") && /\d/.test(block.text) && block.text.length < 140) {
      return block.text.trim();
    }
  }
  return "";
}

async function buildDocument(source: SourceItem, tr: Translation) {
  const title = localizedString({ ...source.title, ...tr.title });
  const excerpt = localizedString(buildExcerpts(source, tr));
  const bodies = buildBodies(source, tr);
  const images = await buildImages(source, title);

  const localizedBody = {
    _type: "object",
    ...Object.fromEntries(Object.entries(bodies).map(([lang, value]) => [lang, value])),
  };

  if (source.kind === "course") {
    return {
      doc: {
        _id: `gos-course-${source.slug}`,
        _type: "course",
        slug: { _type: "slug", current: source.slug },
        status: source.status ?? "past",
        title: { _type: "localizedString", ...title },
        type: { _type: "localizedString", ...kindLabel(source, tr) },
        date: { _type: "localizedString", ...localizedString(tr.dateDisplay ?? {}) },
        location: {
          _type: "localizedString",
          ...localizedString({
            ru: venueLine(resolveBlocks(source, tr, "ru")),
            hy: venueLine(resolveBlocks(source, tr, "hy")),
            en: venueLine(resolveBlocks(source, tr, "en")),
          }),
        },
        description: { _type: "localizedText", ...excerpt },
        body: localizedBody,
        sourceUrl: source.sourceUrl,
        ...(images.main ? { image: images.main } : {}),
        gallery: images.gallery,
      },
      images,
      bodies,
    };
  }

  return {
    doc: {
      _id: `gos-news-${source.slug}`,
      _type: "news",
      slug: { _type: "slug", current: source.slug },
      title: { _type: "localizedString", ...title },
      excerpt: { _type: "localizedText", ...excerpt },
      // The legacy plain-paragraph field stays required by the schema.
      body: Object.fromEntries(
        LANGS.filter((l) => bodies[l]).map((l) => [l, bodies[l]]),
      ),
      richBody: localizedBody,
      date: source.date.iso ?? "2000-01-01",
      category: { _type: "localizedString", ru: "Архив", hy: "Արխիվ", en: "Archive" },
      sourceUrl: source.sourceUrl,
      ...(images.main ? { image: images.main } : {}),
      gallery: images.gallery,
    },
    images,
    bodies,
  };
}

// --- main ------------------------------------------------------------------

async function main() {
  const translated = (await readdir(TRANSLATIONS_DIR))
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => f.slice(0, -5))
    .filter((slug) => !ONLY || ONLY.includes(slug))
    .sort();

  if (ONLY) {
    const missing = ONLY.filter((s) => !translated.includes(s));
    if (missing.length) {
      console.error(`No translation for: ${missing.join(", ")}`);
      process.exit(1);
    }
  }

  console.log(
    `${DRY_RUN ? "DRY RUN — nothing will be written" : "IMPORTING"} · project ${projectId} · dataset ${dataset}`,
  );
  console.log(`${translated.length} item(s)\n`);

  let courses = 0;
  let news = 0;
  let imagesTotal = 0;
  let imagesResolved = 0;
  const problems: string[] = [];

  for (const slug of translated) {
    const source: SourceItem = JSON.parse(
      await readFile(path.join(DATA_DIR, `${slug}.json`), "utf8"),
    );
    const tr: Translation = JSON.parse(
      await readFile(path.join(TRANSLATIONS_DIR, `${slug}.json`), "utf8"),
    );

    const { doc, images, bodies } = await buildDocument(source, tr);
    imagesTotal += images.total;
    imagesResolved += images.uploaded;
    if (source.kind === "course") courses += 1;
    else news += 1;

    const langs = Object.keys(bodies).join(",") || "—";
    const blockCounts = Object.entries(bodies)
      .map(([l, b]) => `${l}:${b.length}`)
      .join(" ");

    if (!doc.title || Object.keys(doc.title).length <= 1) {
      problems.push(`${slug}: title present in fewer than 2 languages`);
    }
    if (!images.main) {
      problems.push(
        `${slug}: no main image${DRY_RUN ? " (dry run does not upload, so this is expected for new assets)" : ""}`,
      );
    }

    console.log(
      `  ${doc._id.padEnd(34)} ${source.kind.padEnd(6)} [${langs}] ${blockCounts.padEnd(26)} ${images.uploaded}/${images.total} img`,
    );

    if (!DRY_RUN) {
      // The document shape is built by hand to match the schema, so it does
      // not line up with the client's generic stub type.
      await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    }
  }

  console.log("\n─────────────────────────────");
  console.log(`Documents : ${courses} course(s), ${news} news`);
  console.log(`Images    : ${imagesResolved}/${imagesTotal} resolved`);
  if (problems.length) {
    console.log(`\nNotes (${problems.length}):`);
    for (const p of problems.slice(0, 12)) console.log(`  · ${p}`);
    if (problems.length > 12) console.log(`  · … ${problems.length - 12} more`);
  }
  console.log(
    DRY_RUN
      ? "\nDry run complete — nothing was written to Sanity."
      : "\nImport complete.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
