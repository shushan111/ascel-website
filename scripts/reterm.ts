/**
 * Applies a terminology correction across every translation file at once.
 *
 * The anatomical terms were never signed off, so this exists to make a change
 * of mind cheap: edit `_glossary.json`, or pass a replacement directly, and no
 * retranslation is needed.
 *
 *   npx tsx scripts/reterm.ts --hy "խոյոսկր=թաթոսկր" --dry-run
 *   npx tsx scripts/reterm.ts --hy "խոյոսկր=թաթոսկր" --en "talus=astragalus"
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "data", "gos", "translations");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");

function pairs(lang: string): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  args.forEach((a, i) => {
    if (a !== `--${lang}`) return;
    const spec = args[i + 1];
    const at = spec?.indexOf("=") ?? -1;
    if (at > 0) out.push([spec.slice(0, at), spec.slice(at + 1)]);
  });
  return out;
}

const REPLACEMENTS: Record<string, Array<[string, string]>> = {
  hy: pairs("hy"),
  en: pairs("en"),
  ru: pairs("ru"),
};

function replaceDeep(value: unknown, subs: Array<[string, string]>, count: { n: number }): unknown {
  if (typeof value === "string") {
    let next = value;
    for (const [from, to] of subs) {
      if (next.includes(from)) {
        count.n += next.split(from).length - 1;
        next = next.split(from).join(to);
      }
    }
    return next;
  }
  if (Array.isArray(value)) return value.map((v) => replaceDeep(v, subs, count));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, replaceDeep(v, subs, count)]),
    );
  }
  return value;
}

async function main() {
  const active = Object.entries(REPLACEMENTS).filter(([, subs]) => subs.length);
  if (!active.length) {
    console.error('nothing to do — pass e.g. --hy "old=new"');
    process.exit(1);
  }

  for (const [lang, subs] of active) {
    console.log(`${lang}: ${subs.map(([a, b]) => `${a} → ${b}`).join(", ")}`);
  }

  const files = (await readdir(DIR)).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  let total = 0;

  for (const file of files) {
    const full = path.join(DIR, file);
    const doc = JSON.parse(await readFile(full, "utf8"));
    const count = { n: 0 };

    for (const [lang, subs] of active) {
      if (doc.body?.[lang]) doc.body[lang] = replaceDeep(doc.body[lang], subs, count);
      if (doc.title?.[lang]) doc.title[lang] = replaceDeep(doc.title[lang], subs, count);
      if (doc.excerpt?.[lang]) doc.excerpt[lang] = replaceDeep(doc.excerpt[lang], subs, count);
    }

    if (count.n) {
      total += count.n;
      console.log(`  ${file}: ${count.n} replacement(s)`);
      if (!DRY) await writeFile(full, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
    }
  }

  console.log(`\n${total} replacement(s) across ${files.length} file(s)${DRY ? " (dry run — nothing written)" : ""}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
