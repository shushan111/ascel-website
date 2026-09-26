import { cache } from "react";
import type { Founder } from "@/types";
import { client } from "@/sanity/lib/client";
import {
  mapSanityFounder,
  type SanityFounderDocument,
} from "@/sanity/lib/mapFounder";
import { foundersQuery } from "@/sanity/lib/queries/founders";

/** Active founders, in Studio order. Empty when nothing has been added yet. */
export const getFounders = cache(async (): Promise<Founder[]> => {
  const documents: SanityFounderDocument[] = await client.fetch(foundersQuery);
  return documents.map(mapSanityFounder);
});
