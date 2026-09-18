/**
 * Phase 2 — collection.
 *
 * Pulls every course and news item from gyumriorthoschool.org into
 * ./data/gos/<slug>.json plus ./data/gos/images/<slug>/, and writes nothing to
 * Sanity. Translation and import are separate steps.
 *
 *   npx tsx scripts/scrape-gos.ts            # everything
 *   npx tsx scripts/scrape-gos.ts --limit 3  # first three of each kind
 *   npx tsx scripts/scrape-gos.ts --only hip2026,16082022
 *   npx tsx scripts/scrape-gos.ts --no-images
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

import { deriveChromeRecords, extractBlocks, extractImages, pageTitle, type Block } from "./gos/tilda";
import { fileNameFromUrl, MIN_BYTES, MIN_EDGE, probeImage } from "./gos/media";
import { parseDate } from "./gos/dates";
import { segmentByLanguage, type Lang } from "./gos/segment";

const BASE = "https://gyumriorthoschool.org";
const OUT_DIR = path.join(process.cwd(), "data", "gos");
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const REQUEST_DELAY_MS = 350;

type Kind = "course" | "news";

export interface GosItem {
  slug: string;
  kind: Kind;
  status?: "upcoming" | "past";
  sourceUrl: string;
  sourceLang: Lang;
  /** Languages the source page already provides — the rest need translating. */
  sourceLangs: Lang[];
  title: Partial<Record<Lang, string>>;
  date: { iso: string | null; raw: string };
  body: Partial<Record<Lang, Block[]>>;
  mainImage: string | null;
  gallery: string[];
  images: Array<{
    order: number;
    src: string;
    file: string;
    width: number;
    height: number;
    bytes: number;
  }>;
  warnings: string[];
}

const args = process.argv.slice(2);
function flag(name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}
const LIMIT = flag("limit") ? Number(flag("limit")) : undefined;
const ONLY = flag("only")?.split(",").map((s) => s.trim()).filter(Boolean);
const NO_IMAGES = args.includes("--no-images");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  await sleep(REQUEST_DELAY_MS);
  return res.text();
}

async function getBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  await sleep(120);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * The homepage lists courses in two Tilda blocks separated by the
 * "ПРЕДСТОЯЩИЕ КУРСЫ" / "ПРОШЕДШИЕ КУРСЫ" headings, which is the only place
 * upcoming/past is expressed.
 */
function courseSlugsByStatus(html: string): Array<{ slug: string; status: "upcoming" | "past" }> {
  // Case-sensitive on purpose: the nav links read "Будущие курсы" /
  // "Прошедшие курсы" in title case and appear before the sections, so a
  // case-insensitive match lands on the menu and marks everything "past".
  // "ПРОШЕДШИЕ" also occurs earlier in the page (mobile menu markup), so the
  // past section is the first occurrence *after* the upcoming heading.
  const upcomingAt = html.search(/ПРЕДСТОЯЩИЕ\s+КУРСЫ/);
  const pastAt = upcomingAt < 0 ? -1 : html.indexOf("ПРОШЕДШИЕ", upcomingAt);

  const found: Array<{ slug: string; status: "upcoming" | "past" }> = [];
  const seen = new Set<string>();
  const skip = new Set(["news", "pp", "prop"]);

  for (const m of html.matchAll(/href="\/([a-z0-9][a-z0-9-]*)"/gi)) {
    const slug = m[1];
    if (skip.has(slug) || seen.has(slug)) continue;
    const at = m.index ?? 0;
    if (upcomingAt < 0 || at < upcomingAt) continue;
    const status = pastAt > 0 && at >= pastAt ? "past" : "upcoming";
    seen.add(slug);
    found.push({ slug, status });
  }
  return found;
}

/** slug -> thumbnail, taken from the news listing's own cards. */
function newsThumbnails(html: string): Map<string, string> {
  const $ = cheerio.load(html);
  const map = new Map<string, string>();
  $("a.t404__link").each((_, el) => {
    const href = ($(el).attr("href") ?? "").match(/^\/([a-z0-9-]+)$/i);
    if (!href) return;
    const img = $(el).find("[data-original]").first().attr("data-original");
    if (img?.startsWith("https://static.tildacdn.com/")) map.set(href[1], img);
  });
  return map;
}

function newsSlugs(html: string): string[] {
  const $ = cheerio.load(html);
  const slugs: string[] = [];
  $("a.t404__link").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    const m = href.match(/^\/([a-z0-9-]+)$/i);
    if (m && !slugs.includes(m[1])) slugs.push(m[1]);
  });
  return slugs;
}

/**
 * The page title repeats as the first content block on most pages; drop it so
 * it is not duplicated inside the body.
 */
function dropRepeatedTitle(blocks: Block[], title: string): Block[] {
  const key = title.toLowerCase().replace(/\s+/g, "").slice(0, 24);
  if (key.length < 6) return blocks;
  const first = blocks[0];
  if (first && "text" in first && first.text.toLowerCase().replace(/\s+/g, "").startsWith(key)) {
    return blocks.slice(1);
  }
  return blocks;
}

/** Tilda's `t37` block is the dedicated date strip on news pages. */
function dateRecordText(html: string): string {
  const $ = cheerio.load(html);
  const hit = $("div[data-record-type='37']").first().text();
  return hit.replace(/\s+/g, " ").trim();
}

async function downloadImages(slug: string, refs: Array<{ order: number; src: string }>) {
  const dir = path.join(OUT_DIR, "images", slug);
  await mkdir(dir, { recursive: true });

  const kept: GosItem["images"] = [];
  const hashes = new Set<string>();
  const { createHash } = await import("node:crypto");

  for (const ref of refs) {
    let buf: Buffer;
    try {
      buf = await getBuffer(ref.src);
    } catch {
      continue;
    }
    if (buf.byteLength < MIN_BYTES) continue;

    const info = probeImage(buf);
    if (info.width < MIN_EDGE || info.height < MIN_EDGE) continue;

    // Content hash catches the same photo served under two Tilda ids.
    const hash = createHash("sha1").update(buf).digest("hex");
    if (hashes.has(hash)) continue;
    hashes.add(hash);

    const name = fileNameFromUrl(ref.src, kept.length);
    await writeFile(path.join(dir, name), buf);
    kept.push({
      order: kept.length,
      src: ref.src,
      file: path.posix.join("images", slug, name),
      width: info.width,
      height: info.height,
      bytes: buf.byteLength,
    });
  }

  return kept;
}

async function scrapeItem(
  slug: string,
  kind: Kind,
  status: "upcoming" | "past" | undefined,
  chrome: Set<string>,
  fallbackImage?: string,
): Promise<GosItem> {
  const sourceUrl = `${BASE}/${slug}`;
  const html = await get(sourceUrl);
  const warnings: string[] = [];

  const rawTitle = pageTitle(html);
  // Course titles are written as "Name | 2-3 October, Gyumri".
  const title = rawTitle.split("|")[0].trim() || slug;

  const blocks = dropRepeatedTitle(extractBlocks(html, chrome), title);
  const { byLang, multilingual, primary } = segmentByLanguage(blocks);
  const sourceLangs = (Object.keys(byLang) as Lang[]).filter((l) => (byLang[l]?.length ?? 0) > 0);

  // The <title> element is single-language; attribute it to whichever language
  // its own script says, not to the page's dominant body language.
  const titleLang = segmentByLanguage([{ type: "p", text: title }]).primary;

  // The dedicated date strip first, then the title, then the body, then the
  // slug. The slug is authoritative for news (DDMMYYYY) so it rarely gets here.
  const dateCandidates = [
    dateRecordText(html),
    rawTitle,
    ...blocks.filter((b): b is Extract<Block, { text: string }> => "text" in b).map((b) => b.text),
  ].filter(Boolean);

  let date = { iso: null as string | null, raw: "" };
  for (const candidate of dateCandidates) {
    const parsed = parseDate(candidate, slug);
    if (parsed.iso) {
      date = parsed;
      break;
    }
  }
  if (!date.iso) {
    date = parseDate(rawTitle, slug, true);
    warnings.push(
      date.iso
        ? `exact date not found; approximated as ${date.iso} — confirm by hand`
        : "no date could be derived",
    );
  }

  const imageRefs = extractImages(html, chrome);
  if (imageRefs.length === 0 && fallbackImage) {
    imageRefs.push({ order: 0, src: fallbackImage });
  }
  const images = NO_IMAGES ? [] : await downloadImages(slug, imageRefs);

  if (!NO_IMAGES && images.length === 0) warnings.push("no usable images found");
  if (blocks.length === 0) warnings.push("no body blocks extracted");

  const item: GosItem = {
    slug,
    kind,
    ...(status ? { status } : {}),
    sourceUrl,
    sourceLang: primary,
    sourceLangs,
    title: { [titleLang]: title },
    date,
    body: byLang,
    mainImage: images[0]?.file ?? null,
    gallery: images.slice(1).map((i) => i.file),
    images,
    warnings,
  };

  if (!multilingual) warnings.push(`only ${primary} on the source page — needs translation`);
  for (const lang of ["hy", "ru", "en"] as Lang[]) {
    if (!sourceLangs.includes(lang)) warnings.push(`missing ${lang}`);
  }

  return item;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log("Fetching index pages…");
  const home = await get(`${BASE}/`);
  const newsIndex = await get(`${BASE}/news`);
  const thumbnails = newsThumbnails(newsIndex);

  let courses = courseSlugsByStatus(home);
  let news = newsSlugs(newsIndex);

  // Chrome is whatever three unrelated pages have in common.
  const probeSlugs = [courses[0]?.slug, courses[courses.length - 1]?.slug, news[0]].filter(
    Boolean,
  ) as string[];
  const probes: string[] = [];
  for (const slug of probeSlugs) probes.push(await get(`${BASE}/${slug}`));
  const chrome = deriveChromeRecords(probes);
  console.log(`Identified ${chrome.size} chrome records shared by all sample pages.`);

  if (ONLY) {
    courses = courses.filter((c) => ONLY.includes(c.slug));
    news = news.filter((s) => ONLY.includes(s));
  }
  if (LIMIT) {
    courses = courses.slice(0, LIMIT);
    news = news.slice(0, LIMIT);
  }

  console.log(
    `Found ${courses.length} courses (${courses.filter((c) => c.status === "upcoming").length} upcoming, ${courses.filter((c) => c.status === "past").length} past) and ${news.length} news items.\n`,
  );

  const items: GosItem[] = [];
  const queue: Array<{ slug: string; kind: Kind; status?: "upcoming" | "past" }> = [
    ...courses.map((c) => ({ slug: c.slug, kind: "course" as const, status: c.status })),
    ...news.map((slug) => ({ slug, kind: "news" as const })),
  ];

  for (const [index, entry] of queue.entries()) {
    process.stdout.write(`[${index + 1}/${queue.length}] ${entry.slug} … `);
    try {
      const item = await scrapeItem(
        entry.slug,
        entry.kind,
        entry.status,
        chrome,
        thumbnails.get(entry.slug),
      );
      await writeFile(
        path.join(OUT_DIR, `${item.slug}.json`),
        `${JSON.stringify(item, null, 2)}\n`,
        "utf8",
      );
      items.push(item);
      console.log(
        `${item.kind}${item.status ? `/${item.status}` : ""} · [${item.sourceLangs.join(",")}] · ${Object.values(item.body).reduce((n, b) => n + (b?.length ?? 0), 0)} blocks · ${item.images.length} images`,
      );
    } catch (error) {
      console.log(`FAILED — ${(error as Error).message}`);
    }
  }

  const summary = {
    scrapedAt: new Date().toISOString(),
    counts: {
      total: items.length,
      courses: items.filter((i) => i.kind === "course").length,
      news: items.filter((i) => i.kind === "news").length,
      upcoming: items.filter((i) => i.status === "upcoming").length,
      past: items.filter((i) => i.status === "past").length,
      images: items.reduce((n, i) => n + i.images.length, 0),
    },
    languageCoverage: {
      hy: items.filter((i) => i.sourceLangs.includes("hy")).length,
      ru: items.filter((i) => i.sourceLangs.includes("ru")).length,
      en: items.filter((i) => i.sourceLangs.includes("en")).length,
      allThree: items.filter((i) => i.sourceLangs.length === 3).length,
      singleLanguage: items.filter((i) => i.sourceLangs.length === 1).length,
    },
    needsTranslation: items
      .filter((i) => i.sourceLangs.length < 3)
      .map((i) => ({ slug: i.slug, has: i.sourceLangs, missing: (["hy", "ru", "en"] as Lang[]).filter((l) => !i.sourceLangs.includes(l)) })),
    warnings: items.filter((i) => i.warnings.length).map((i) => ({ slug: i.slug, warnings: i.warnings })),
    items: items.map((i) => ({
      slug: i.slug,
      kind: i.kind,
      status: i.status,
      langs: i.sourceLangs,
      date: i.date.iso,
      title: Object.values(i.title)[0],
      blocks: Object.values(i.body).reduce((n, b) => n + (b?.length ?? 0), 0),
      images: i.images.length,
    })),
  };

  await writeFile(path.join(OUT_DIR, "_summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");

  console.log("\n─────────────────────────────");
  console.log(`Items   : ${summary.counts.total} (${summary.counts.courses} courses, ${summary.counts.news} news)`);
  console.log(`Status  : ${summary.counts.upcoming} upcoming, ${summary.counts.past} past`);
  console.log(`Images  : ${summary.counts.images}`);
  console.log(`Languages present: ${JSON.stringify(summary.languageCoverage)}`);
  console.log(`Need translation : ${summary.needsTranslation.length} item(s)`);
  console.log(`Warnings: ${summary.warnings.length} item(s)`);
  console.log(`Output  : data/gos/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
