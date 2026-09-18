import { cache } from "react";
import type { EventItem } from "@/types";
import { client } from "@/sanity/lib/client";
import { filterAndSortUpcomingEvents } from "@/sanity/lib/eventDate";
import {
  mapSanityEvent,
  type SanityEventDocument,
} from "@/sanity/lib/mapEvent";
import { eventsQuery } from "@/sanity/lib/queries/events";

export const fetchSanityEventDocuments = cache(async (): Promise<SanityEventDocument[]> => {
  return client.fetch(eventsQuery);
});

/** Published Sanity events whose date is today or in the future. Past events are omitted. */
export async function getEvents(): Promise<EventItem[]> {
  const documents = await fetchSanityEventDocuments();
  return filterAndSortUpcomingEvents(documents).map(mapSanityEvent);
}
