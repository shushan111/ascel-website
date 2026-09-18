import type { Program } from "@/types";
import { getExternalUrl } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { mapSanityProgram } from "@/sanity/lib/mapProgram";
import { programsQuery } from "@/sanity/lib/queries/programs";

export async function getPrograms(): Promise<Program[]> {
  const documents = await client.fetch(programsQuery);
  return documents.map(mapSanityProgram);
}

export async function getProgramBySlug(
  slug: string,
): Promise<Program | undefined> {
  const programs = await getPrograms();
  return programs.find((program) => program.slug === slug);
}

/**
 * Programs that carry a full profile on this site are linked internally; the
 * external site is then surfaced from the detail page itself. Programs without
 * a profile still link straight out to their own website when they have one.
 */
export function getProgramHref(program: Program, localePath = "") {
  const prefix = localePath ? `${localePath}` : "";
  const internal = {
    href: `${prefix}/programs/${program.slug}`,
    external: false as const,
  };

  if (program.detail || program.hasOnSiteProfile) return internal;

  if (program.externalUrlKey) {
    const external = getExternalUrl(program.externalUrlKey);
    if (external) {
      return { href: external, external: true as const };
    }
  }
  return internal;
}
