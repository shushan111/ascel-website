import { parseEventDay, parseEventMonth, startOfDay } from "./eventDate";

type LocalizedMonth = {
  en: string;
  hy: string;
  ru: string;
};

const MONTH_LOCALES = {
  en: "en-GB",
  hy: "hy-AM",
  ru: "ru-RU",
} as const;

function formatEventMonthLabel(date: Date, locale: keyof typeof MONTH_LOCALES): string {
  return new Intl.DateTimeFormat(MONTH_LOCALES[locale], {
    month: "short",
  }).format(date);
}

export function eventDateToDisplayParts(isoDate: string): {
  month: LocalizedMonth;
  day: string;
} {
  const date = new Date(`${isoDate}T00:00:00`);
  return {
    month: {
      en: formatEventMonthLabel(date, "en"),
      hy: formatEventMonthLabel(date, "hy"),
      ru: formatEventMonthLabel(date, "ru"),
    },
    day: String(date.getDate()),
  };
}

export function inferEventIsoDate(
  monthEn: string,
  day: string,
  now = new Date(),
): string | null {
  const month = parseEventMonth(monthEn);
  const dayNum = parseEventDay(day);
  if (!month || !dayNum) return null;

  let year = now.getFullYear();
  let candidate = new Date(year, month - 1, dayNum);

  if (startOfDay(candidate) < startOfDay(now)) {
    year += 1;
    candidate = new Date(year, month - 1, dayNum);
  }

  const monthPart = String(month).padStart(2, "0");
  const dayPart = String(dayNum).padStart(2, "0");

  return `${year}-${monthPart}-${dayPart}`;
}
