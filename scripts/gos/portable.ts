/**
 * Converts the scraped block list into Sanity Portable Text.
 *
 * Keys have to be stable: `createOrReplace` on a re-run must produce the same
 * document, so every `_key` is derived from the block's position rather than
 * from a random id.
 */
import type { Block } from "./tilda";

export interface PortableBlock {
  _type: string;
  _key: string;
  [field: string]: unknown;
}

function span(text: string, key: string) {
  return { _type: "span", _key: `${key}s`, text, marks: [] as string[] };
}

function textBlock(style: string, text: string, key: string): PortableBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [span(text, key)],
  };
}

function listItem(text: string, listItem: "bullet" | "number", key: string): PortableBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    listItem,
    level: 1,
    markDefs: [],
    children: [span(text, key)],
  };
}

/**
 * A table's first row is treated as a header only when it carries no time in
 * its first cell — which is exactly how the source distinguishes the two.
 */
function looksLikeHeader(row: string[]): boolean {
  const first = row[0] ?? "";
  if (!first) return false;
  return !/\d{1,2}:\d{2}/.test(first);
}

export function toPortableText(blocks: Block[], prefix: string): PortableBlock[] {
  const out: PortableBlock[] = [];

  blocks.forEach((block, index) => {
    const key = `${prefix}${index}`;

    if (block.type === "table") {
      const rows = block.rows;
      out.push({
        _type: "contentTable",
        _key: key,
        hasHeader: rows.length > 0 && looksLikeHeader(rows[0]),
        rows: rows.map((cells, r) => ({
          _type: "contentTableRow",
          _key: `${key}r${r}`,
          cells,
        })),
      });
      return;
    }

    if (block.type === "ul" || block.type === "ol") {
      const kind = block.type === "ul" ? "bullet" : "number";
      block.items.forEach((item, i) => {
        out.push(listItem(item, kind, `${key}i${i}`));
      });
      return;
    }

    if (!("text" in block)) return;
    const style = block.type === "h2" ? "h2" : block.type === "h3" ? "h3" : "normal";
    if (!block.text.trim()) return;
    out.push(textBlock(style, block.text, key));
  });

  return out;
}

/** The first real paragraph, used as the card excerpt and SEO description. */
export function firstParagraph(blocks: Block[], limit = 280): string {
  for (const block of blocks) {
    if (block.type !== "p" || !("text" in block)) continue;
    const text = block.text.trim();
    if (text.length > 40) {
      return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
    }
  }
  for (const block of blocks) {
    if (!("text" in block)) continue;
    const text = block.text.trim();
    if (text) return text.slice(0, limit);
  }
  return "";
}
