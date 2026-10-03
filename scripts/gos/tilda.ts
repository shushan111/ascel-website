/**
 * Tilda page parsing helpers.
 *
 * gyumriorthoschool.org is a Tilda site: every page is a flat list of
 * `<div id="recNNN" data-record-type="NN">` blocks. Site chrome (menu, social
 * strips, footer) is the same set of records on every page, so it can be
 * identified by intersection rather than by a hand-maintained blocklist, which
 * would rot the moment the source site adds a block.
 */
import * as cheerio from "cheerio";
import type { Element } from "domhandler";

export type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; rows: string[][] };

export interface ImageRef {
  order: number;
  src: string;
}

const RECORD_SELECTOR = "div[id^='rec'][data-record-type]";

/** Record types that never carry article content: scripts, spacers, forms. */
const IGNORED_RECORD_TYPES = new Set(["131", "215", "241", "33", "453", "474"]);

/** Tilda's transparent placeholder, plus the site logo used as a divider. */
const IMAGE_NAME_BLOCKLIST = [
  "noroot.png", // Tilda's transparent lazy-load placeholder
  "gyumri_logo",
  "favicon",
  "/logo-",
  "tildacdn.com/img/", // Tilda's own UI sprites, not page content
];

/**
 * `<br>` carries real structure on this site: it separates sentences and, on
 * news pages, the Armenian / Russian / English versions of the same text.
 * Turning it into a newline before parsing preserves both.
 */
export function normalizeBreaks(html: string): string {
  return html.replace(/<br\s*\/?>/gi, "\n");
}

export function recordIds(html: string): string[] {
  const $ = cheerio.load(html);
  return $(RECORD_SELECTOR)
    .toArray()
    .map((el) => $(el).attr("id") ?? "")
    .filter(Boolean);
}

/**
 * Records shared by every sample page are chrome. Three unrelated pages is
 * enough to separate them from content without catching a block that two
 * course pages happen to share.
 */
export function deriveChromeRecords(samples: string[]): Set<string> {
  const sets = samples.map((html) => new Set(recordIds(html)));
  if (sets.length === 0) return new Set();
  return sets.reduce((acc, cur) => new Set([...acc].filter((id) => cur.has(id))));
}

function clean(value: string): string {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

export function pageTitle(html: string): string {
  const $ = cheerio.load(html);
  return clean($("title").first().text());
}

/**
 * Tilda's `t431` block stores a table as semicolon-separated cells inside one
 * text node — the course programmes (time; topic; speaker) all live in it.
 */
function parseSemicolonTable(text: string): string[][] {
  const rows = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(";").map((cell) => clean(cell)))
    .filter((row) => row.some(Boolean));

  // Some tables put the header row and the first data row in one text node, so
  // the last header cell comes back as "Notes08:30 - 09:00". Splitting on a
  // time that starts mid-cell recovers both rows.
  const first = rows[0];
  if (first) {
    // The label must end in a letter — "Примечания08:30" splits, "09:00–09:30"
    // must not, or every ordinary time cell would be cut in half.
    const GLUED = /^(\D*\p{L})(\d{1,2}:\d{2}\s*[-–—].*)$/u;
    const at = first.findIndex((cell) => GLUED.test(cell));
    if (at >= 0) {
      const m = first[at].match(GLUED);
      if (m) {
        const header = [...first.slice(0, at), m[1].trim()];
        const dataRow = [m[2].trim(), ...first.slice(at + 1)];
        rows.splice(0, 1, header, dataRow);
      }
    }
  }
  return rows;
}

/**
 * Walks one record in document order and turns it into content blocks.
 * Class names rather than tag names drive this: Tilda renders headings as
 * `div.t-title` / `div.t-heading` just as often as it uses `<h2>`.
 */
function blocksFromRecord($: cheerio.CheerioAPI, record: Element): Block[] {
  const blocks: Block[] = [];
  const seen = new Set<string>();

  const push = (block: Block) => {
    const key = JSON.stringify(block);
    if (seen.has(key)) return;
    seen.add(key);
    blocks.push(block);
  };

  const isHeading = (cls: string) =>
    /\bt-title\b|\bt-heading\b|\bt-section__title\b|\bt-name\b/.test(cls);
  const isBody = (cls: string) =>
    /\bt-descr\b|\bt-text\b|\bt-section__descr\b|\bt-card__descr\b/.test(cls);

  $(record)
    .find("h1,h2,h3,h4,div,p,li,td")
    .toArray()
    .forEach((el) => {
      const node = $(el);
      const tag = (el as Element).tagName?.toLowerCase();
      const cls = node.attr("class") ?? "";

      const classed = isHeading(cls) || isBody(cls);

      // Only leaf-ish nodes, or a wrapper would duplicate its children's text.
      // A classed node still counts as a leaf when the divs beneath it are
      // bare style wrappers — which is how Tilda nests its body copy.
      if (!classed && node.children("div,p,ul,ol,table").length > 0) return;
      if (classed) {
        const nested = node.find("[class]").toArray().some((child) => {
          const c = $(child).attr("class") ?? "";
          return isHeading(c) || isBody(c);
        });
        if (nested) return;
      }

      const text = clean(node.text());
      if (!text || text.length < 2) return;

      if (tag === "li") {
        const parent = node.parent();
        const listType = parent.is("ol") ? "ol" : "ul";
        const items = parent
          .children("li")
          .toArray()
          .map((li) => clean($(li).text()))
          .filter(Boolean);
        if (items.length) push({ type: listType, items });
        return;
      }

      if (tag === "h1" || tag === "h2" || isHeading(cls)) {
        push({ type: text.length > 90 ? "p" : "h2", text });
        return;
      }
      if (tag === "h3" || tag === "h4") {
        push({ type: "h3", text });
        return;
      }
      if (isBody(cls) || tag === "p") {
        const rawText = node.text();

        // A semicolon-delimited multi-line blob is a Tilda table, not prose.
        if (rawText.includes(";") && /\d{1,2}[:.]\d{2}/.test(rawText)) {
          const rows = parseSemicolonTable(rawText);
          if (rows.length > 1) {
            push({ type: "table", rows });
            return;
          }
        }

        // One paragraph per line: the newlines came from <br>.
        rawText
          .split("\n")
          .map((line) => clean(line))
          .filter((line) => line.length > 1)
          .forEach((line) => push({ type: "p", text: line }));
      }
    });

  return blocks;
}

export function extractBlocks(html: string, chrome: Set<string>): Block[] {
  const $ = cheerio.load(normalizeBreaks(html));
  const blocks: Block[] = [];

  $(RECORD_SELECTOR)
    .toArray()
    .forEach((el) => {
      const id = $(el).attr("id") ?? "";
      const type = $(el).attr("data-record-type") ?? "";
      if (chrome.has(id) || IGNORED_RECORD_TYPES.has(type)) return;
      blocks.push(...blocksFromRecord($, el));
    });

  return blocks;
}

/**
 * Every Tilda image on this site is already served at full size — there are no
 * `-/resize/` variants anywhere in the source — so the URL is taken as-is.
 * `data-original` wins over `src` because lazy-loaded blocks put the
 * placeholder in `src`.
 */
export function extractImages(html: string, chrome: Set<string>): ImageRef[] {
  const $ = cheerio.load(html);
  const urls: string[] = [];

  const add = (value?: string | null) => {
    if (!value) return;
    const url = value.trim();
    if (!url.startsWith("https://static.tildacdn.com/")) return;
    const lower = url.toLowerCase();
    if (IMAGE_NAME_BLOCKLIST.some((bad) => lower.includes(bad))) return;
    if (!urls.includes(url)) urls.push(url);
  };

  $(RECORD_SELECTOR)
    .toArray()
    .forEach((el) => {
      const id = $(el).attr("id") ?? "";
      const type = $(el).attr("data-record-type") ?? "";
      if (chrome.has(id) || IGNORED_RECORD_TYPES.has(type)) return;

      $(el)
        .find("img,div,a,span,section")
        .toArray()
        .forEach((node) => {
          const n = $(node);
          add(n.attr("data-original"));
          add(n.attr("src"));
          const style = n.attr("style") ?? "";
          const bg = style.match(/url\(['"]?([^'")]+)['"]?\)/);
          if (bg) add(bg[1]);
        });
    });

  return urls.map((src, order) => ({ order, src }));
}
