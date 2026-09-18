/**
 * Language segmentation.
 *
 * The news pages turned out to already carry the same text three times over —
 * Armenian, then Russian, then English — stacked inside one Tilda block and
 * separated only by `<br>`. Splitting those runs apart means most news items
 * need no translation at all, and the ones that do are visible immediately.
 */
import type { Block } from "./tilda";
import { detectLanguage } from "./dates";

export type Lang = "hy" | "ru" | "en";

function blockText(block: Block): string {
  if ("text" in block) return block.text;
  if ("items" in block) return block.items.join(" ");
  return block.rows.flat().join(" ");
}

/**
 * A block is only assigned a language when its script is unambiguous. Short
 * blocks and bare course codes ("GYUMRI HAND SURGERY COURSE 2022") carry no
 * signal, so they inherit the run they sit in rather than starting a new one.
 */
function blockLanguage(block: Block): Lang | null {
  const text = blockText(block);
  const arm = (text.match(/[԰-֏]/g) ?? []).length;
  const cyr = (text.match(/[Ѐ-ӿ]/g) ?? []).length;
  const lat = (text.match(/[A-Za-z]/g) ?? []).length;
  const total = arm + cyr + lat;
  if (total < 12) return null;

  if (arm / total > 0.3) return "hy";
  if (cyr / total > 0.3) return "ru";
  if (lat / total > 0.6) return "en";
  return null;
}

export interface Segmented {
  byLang: Partial<Record<Lang, Block[]>>;
  /** True when the page carried more than one language for the same content. */
  multilingual: boolean;
  primary: Lang;
}

export function segmentByLanguage(blocks: Block[]): Segmented {
  const byLang: Partial<Record<Lang, Block[]>> = {};
  let current: Lang | null = null;

  for (const block of blocks) {
    const detected = blockLanguage(block);
    if (detected) current = detected;
    const lang = current ?? detectLanguage(blockText(block));
    (byLang[lang] ??= []).push(block);
  }

  const present = (Object.keys(byLang) as Lang[]).filter((l) => (byLang[l]?.length ?? 0) > 0);
  const primary =
    present.sort(
      (a, b) =>
        (byLang[b]?.reduce((n, x) => n + blockText(x).length, 0) ?? 0) -
        (byLang[a]?.reduce((n, x) => n + blockText(x).length, 0) ?? 0),
    )[0] ?? "ru";

  return { byLang, multilingual: present.length > 1, primary };
}
