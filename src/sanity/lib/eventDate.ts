type EventDateFields = {
  date?: string;
  month?: { en?: string };
  day?: string;
};

const MONTH_LOOKUP: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseIsoDate(isoDate: string): Date | null {
  const date = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getEventDateValue(
  event: EventDateFields,
  now = new Date(),
): Date | null {
  if (event.date) {
    return parseIsoDate(event.date);
  }

  return getEventSortDate(event.month?.en ?? "", event.day ?? "", now);
}

export function parseEventMonth(month: string): number | null {
  const normalized = month.trim().toLowerCase().replace(/\./g, "");
  return MONTH_LOOKUP[normalized] ?? null;
}

export function parseEventDay(day: string): number | null {
  const trimmed = day.trim();
  if (!trimmed || trimmed === "—" || trimmed === "-") return null;

  const value = Number.parseInt(trimmed, 10);
  return Number.isNaN(value) ? null : value;
}

export function getEventSortDate(
  monthEn: string,
  day: string,
  now = new Date(),
): Date | null {
  const month = parseEventMonth(monthEn);
  const dayNum = parseEventDay(day);
  if (!month || !dayNum) return null;

  return new Date(now.getFullYear(), month - 1, dayNum);
}

export function isUpcomingSanityEvent(
  event: EventDateFields,
  now = new Date(),
): boolean {
  const date = getEventDateValue(event, now);
  if (!date) return false;

  return startOfDay(date) >= startOfDay(now);
}

export function compareSanityEventsByDate(
  a: EventDateFields,
  b: EventDateFields,
  now = new Date(),
): number {
  const dateA = getEventDateValue(a, now);
  const dateB = getEventDateValue(b, now);

  if (dateA && dateB) return dateA.getTime() - dateB.getTime();
  if (dateA) return -1;
  if (dateB) return 1;
  return 0;
}

export function filterAndSortUpcomingEvents<T extends EventDateFields>(
  events: T[],
  now = new Date(),
): T[] {
  return events
    .filter((event) => isUpcomingSanityEvent(event, now))
    .sort((a, b) => compareSanityEventsByDate(a, b, now));
}
