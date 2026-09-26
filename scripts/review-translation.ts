/**
 * Prints a scraped item and its translation side by side so the wording can be
 * checked before anything reaches Sanity.
 *
 *   npx tsx scripts/review-translation.ts hip2026
 *   npx tsx scripts/review-translation.ts hip2026 --full   # every table row
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Block } from "./gos/tilda";

type Lang = "hy" | "ru" | "en";
const LANGS: Lang[] = ["ru", "hy", "en"];
const DIR = path.join(process.cwd(), "data", "gos");

const [slug, ...rest] = process.argv.slice(2);
const FULL = rest.includes("--full");

if (!slug) {
  console.error("usage: npx tsx scripts/review-translation.ts <slug> [--full]");
  process.exit(1);
}

function render(block: Block, full: boolean): string[] {
  if (block.type === "table") {
    const rows = full ? block.rows : block.rows.slice(0, 3);
    const lines = rows.map((r) => `      │ ${r.filter(Boolean).join("  ·  ")}`);
    if (!full && block.rows.length > 3) {
      lines.push(`      │ … ${block.rows.length - 3} more rows`);
    }
    return [`   [table ${block.rows.length}×]`, ...lines];
  }
  if (block.type === "ul" || block.type === "ol") {
    return [`   [${block.type}] ${block.items.join(" · ")}`];
  }
  if (!("text" in block)) return [];
  const marker = block.type.startsWith("h") ? "## " : "   ";
  return [`${marker}${block.text}`];
}

async function main() {
  const item = JSON.parse(await readFile(path.join(DIR, `${slug}.json`), "utf8"));
  let translation: {
    title?: Partial<Record<Lang, string>>;
    dateDisplay?: Partial<Record<Lang, string>>;
    body?: Partial<Record<Lang, Block[]>>;
    notes?: string[];
  } = {};
  try {
    translation = JSON.parse(
      await readFile(path.join(DIR, "translations", `${slug}.json`), "utf8"),
    );
  } catch {
    console.log("(no translation file yet)\n");
  }

  const bodies: Partial<Record<Lang, Block[]>> = { ...item.body, ...translation.body };
  const titles: Partial<Record<Lang, string>> = { ...item.title, ...translation.title };

  console.log("═".repeat(78));
  console.log(`${slug}  ·  ${item.kind}${item.status ? `/${item.status}` : ""}  ·  ${item.date.iso}`);
  console.log(`source: ${item.sourceUrl}  ·  images: ${item.images.length}`);
  console.log("═".repeat(78));

  if (translation.notes?.length) {
    console.log("\nTRANSLATOR NOTES");
    for (const n of translation.notes) console.log(`  • ${n}`);
  }

  console.log("\nTITLE");
  for (const lang of LANGS) {
    console.log(`  ${lang.toUpperCase()}  ${titles[lang] ?? "— missing —"}`);
  }

  if (translation.dateDisplay) {
    console.log("\nDATE");
    for (const lang of LANGS) {
      console.log(`  ${lang.toUpperCase()}  ${translation.dateDisplay[lang] ?? "—"}`);
    }
  }

  for (const lang of LANGS) {
    const blocks = bodies[lang];
    console.log(`\n${"─".repeat(78)}`);
    console.log(`BODY · ${lang.toUpperCase()}  (${blocks?.length ?? 0} blocks)`);
    console.log("─".repeat(78));
    if (!blocks?.length) {
      console.log("  — missing —");
      continue;
    }
    for (const block of blocks) {
      for (const line of render(block, FULL)) console.log(line);
    }
  }

  // Structural parity is what catches a dropped or duplicated block.
  console.log(`\n${"═".repeat(78)}`);
  const shape = (b?: Block[]) => (b ?? []).map((x) => x.type).join(",");
  const ru = shape(bodies.ru);
  for (const lang of ["hy", "en"] as Lang[]) {
    const same = shape(bodies[lang]) === ru;
    console.log(
      `structure ${lang} vs ru: ${same ? "identical ✓" : `DIFFERENT — ru ${bodies.ru?.length ?? 0} blocks, ${lang} ${bodies[lang]?.length ?? 0}`}`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
