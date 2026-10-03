/**
 * Date parsing for the source site.
 *
 * The Tilda pages are inconsistent: news items carry `11/03/2019` or
 * `16 | 08 | 2022`, while course heroes write prose like `2-3 октября 2026`.
 * All of them have to resolve to one ISO date for Sanity's `date` field, with
 * the original string kept so nothing is lost in translation later.
 */

const RU_MONTHS: Record<string, number> = {
  январь: 1, января: 1, янв: 1,
  февраль: 2, февраля: 2, фев: 2,
  март: 3, марта: 3, мар: 3,
  апрель: 4, апреля: 4, апр: 4,
  май: 5, мая: 5,
  июнь: 6, июня: 6, июн: 6,
  июль: 7, июля: 7, июл: 7,
  август: 8, августа: 8, авг: 8,
  сентябрь: 9, сентября: 9, сен: 9, сент: 9,
  октябрь: 10, октября: 10, окт: 10,
  ноябрь: 11, ноября: 11, ноя: 11,
  декабрь: 12, декабря: 12, дек: 12,
};

const EN_MONTHS: Record<string, number> = {
  january: 1, jan: 1, february: 2, feb: 2, march: 3, mar: 3, april: 4, apr: 4,
  may: 5, june: 6, jun: 6, july: 7, jul: 7, august: 8, aug: 8,
  september: 9, sep: 9, sept: 9, october: 10, oct: 10,
  november: 11, nov: 11, december: 12, dec: 12,
};

/** The source mixes -, \u2013, \u2014 and the true minus sign \u2212. */
const DASH = "[-\\u2010-\\u2015\\u2212]";

export interface ParsedDate {
  iso: string | null;
  raw: string;
}

function iso(y: number, m: number, d: number): string | null {
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  if (y < 1990 || y > 2100) return null;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/**
 * The slug is the most reliable signal on this site: news slugs are `DDMMYY`,
 * `DDMMYYYY` or `DD-MM-YYYY`, and course slugs end in a year.
 */
export function dateFromSlug(slug: string): string | null {
  const digits = slug.replace(/\D/g, "");

  if (/^\d{8}$/.test(digits)) {
    const d = Number(digits.slice(0, 2));
    const m = Number(digits.slice(2, 4));
    const y = Number(digits.slice(4, 8));
    const hit = iso(y, m, d);
    if (hit) return hit;
  }

  if (/^\d{6}$/.test(digits)) {
    const d = Number(digits.slice(0, 2));
    const m = Number(digits.slice(2, 4));
    const y = 2000 + Number(digits.slice(4, 6));
    const hit = iso(y, m, d);
    if (hit) return hit;
  }

  return null;
}

/**
 * `allowYearOnly` is off by default: a bare year is a last resort, and letting
 * it fire per-candidate would short-circuit a real date further down the page.
 */
export function parseDate(text: string, slug?: string, allowYearOnly = false): ParsedDate {
  const raw = text.replace(/\s+/g, " ").trim();
  const lower = raw.toLowerCase();

  // 11/03/2019 or 11.03.2019
  const numeric = lower.match(/\b(\d{1,2})[./](\d{1,2})[./](\d{4})\b/);
  if (numeric) {
    const hit = iso(Number(numeric[3]), Number(numeric[2]), Number(numeric[1]));
    if (hit) return { iso: hit, raw: numeric[0] };
  }

  // 16 | 08 | 2022
  const piped = lower.match(/\b(\d{1,2})\s*\|\s*(\d{1,2})\s*\|\s*(\d{4})\b/);
  if (piped) {
    const hit = iso(Number(piped[3]), Number(piped[2]), Number(piped[1]));
    if (hit) return { iso: hit, raw: piped[0] };
  }

  // 2-3 октября 2026  /  23 мая 2026  /  2-3 October 2026
  const words = lower.match(
    new RegExp(`\\b(\\d{1,2})(?:\\s*${DASH}\\s*\\d{1,2})?\\s+([а-яёa-z]+)\\.?\\s+(\\d{4})\\b`),
  );
  if (words) {
    const month = RU_MONTHS[words[2]] ?? EN_MONTHS[words[2]];
    if (month) {
      const hit = iso(Number(words[3]), month, Number(words[1]));
      if (hit) return { iso: hit, raw: words[0] };
    }
  }

  // October 2-3, 2026
  const enFirst = lower.match(
    new RegExp(`\\b([a-z]+)\\s+(\\d{1,2})(?:\\s*${DASH}\\s*\\d{1,2})?,?\\s+(\\d{4})\\b`),
  );
  if (enFirst) {
    const month = EN_MONTHS[enFirst[1]];
    if (month) {
      const hit = iso(Number(enFirst[3]), month, Number(enFirst[2]));
      if (hit) return { iso: hit, raw: enFirst[0] };
    }
  }

  const fromSlug = slug ? dateFromSlug(slug) : null;
  if (fromSlug) return { iso: fromSlug, raw };

  if (allowYearOnly) {
    // Last resort for course slugs like `hip2026`: the year alone, so the item
    // still sorts. Always flagged so it can be corrected by hand.
    const year = raw.match(/\b(20\d{2})\b/) ?? slug?.match(/(20\d{2})/);
    if (year) return { iso: `${year[1]}-01-01`, raw: raw || `${year[1]}` };
  }

  return { iso: null, raw };
}

/** Rough script detection — some news items are already Armenian. */
export function detectLanguage(text: string): "hy" | "ru" | "en" {
  const arm = (text.match(/[\u0530-\u058F]/g) ?? []).length;
  const cyr = (text.match(/[\u0400-\u04FF]/g) ?? []).length;
  const lat = (text.match(/[A-Za-z]/g) ?? []).length;
  if (arm > cyr && arm > lat) return "hy";
  if (cyr >= lat) return "ru";
  return "en";
}
