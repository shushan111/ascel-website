import { cache } from "react";
import type { Course } from "@/types";
import { getCourses } from "@/data/courses";
import { loc } from "@/lib/utils";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * A sortable yyyymmdd read from the English date label ("12–14 June 2022").
 * Courses carry no ISO date, and the label is the one field every imported
 * course has. Unparseable labels sort last.
 */
export function courseSortKey(course: Course): number {
  const label = course.date.en ?? "";
  const match = label.match(/(\d{1,2})?\s*([A-Za-z]+)\s+(\d{4})\s*$/);
  if (!match) return 0;
  const month = MONTHS.indexOf(match[2].toLowerCase()) + 1;
  const day = Number(match[1] ?? 1);
  return Number(match[3]) * 10000 + Math.max(month, 0) * 100 + day;
}

/** Every course, newest first, fetched once per request. */
export const getCoursesByDate = cache(async (): Promise<Course[]> => {
  const courses = await getCourses();
  return [...courses].sort((a, b) => courseSortKey(b) - courseSortKey(a));
});

/** "Gyumri ExFix course · 12–14 June 2022", or null for an unknown slug. */
export async function getPhotoCaption(slug: string, locale: string) {
  const courses = await getCoursesByDate();
  const course = courses.find((item) => item.slug === slug);
  if (!course) return null;
  return [loc(course.title, locale), loc(course.date, locale)]
    .filter(Boolean)
    .join(" · ");
}
