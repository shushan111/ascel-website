import type { Course } from "@/types";
import { client } from "@/sanity/lib/client";
import { mapSanityCourse } from "@/sanity/lib/mapCourse";
import { coursesQuery } from "@/sanity/lib/queries/courses";

export async function getCourses(): Promise<Course[]> {
  const documents = await client.fetch(coursesQuery);
  return documents.map(mapSanityCourse);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug || course.id === slug);
}
