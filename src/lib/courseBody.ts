import type { PortableBlock } from "@/types";

// The imported course pages end with a "Course registration" section: the
// fee, how to pay, the refund terms. Once the course has taken place none of
// it applies, so a completed course is shown without it. The text stays in
// the CMS as part of the course record.
const REGISTRATION_HEADING = /^(ԳՐԱՆՑՈՒՄ|РЕГИСТРАЦИЯ|ЗАРЕГИСТРИРОВАТЬСЯ|COURSE REGISTRATION|REGISTRATION)/iu;
const HEADING_LEVEL: Record<string, number> = { h1: 1, h2: 2, h3: 3, h4: 4 };

function blockText(block: PortableBlock): string {
  const children = (block as { children?: Array<{ text?: string }> }).children;
  return (children ?? []).map((child) => child.text ?? "").join("").trim();
}

/** Drops each registration section: from its heading to the next heading of the same or a higher level. */
export function withoutRegistration(blocks: PortableBlock[] | undefined): PortableBlock[] | undefined {
  if (!blocks) return blocks;
  const kept: PortableBlock[] = [];
  let skipLevel: number | null = null;
  for (const block of blocks) {
    const level = HEADING_LEVEL[(block as { style?: string }).style ?? ""];
    if (skipLevel !== null) {
      if (!level || level > skipLevel) continue;
      skipLevel = null;
    }
    if (level && REGISTRATION_HEADING.test(blockText(block))) {
      skipLevel = level;
      continue;
    }
    kept.push(block);
  }
  return kept;
}
