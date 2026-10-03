import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Course } from "@/types";
import { loc } from "@/lib/utils";
import { courseCover, splitGallery } from "@/lib/media";
import { CoverImage } from "@/components/ui/CoverImage";

/**
 * A completed course as a piece of evidence: its photograph, its name, its
 * date and how many photographs its gallery holds. The whole tile is the link.
 */
export async function CourseCard({
  course,
  locale,
}: {
  course: Course;
  locale: string;
}) {
  const t = await getTranslations("CoursesPage");
  const title = loc(course.title, locale);
  const photos = splitGallery(course.gallery).events.length;

  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <CoverImage
          src={courseCover(course)}
          alt=""
          label={title}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="t-h4 mt-4 text-balance text-ink transition-colors duration-300 group-hover:text-accent-ink">
        <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className="t-meta mt-2 text-muted">
        {loc(course.date, locale)}
        {photos ? ` · ${t("photos", { count: photos })}` : ""}
      </p>
    </article>
  );
}
