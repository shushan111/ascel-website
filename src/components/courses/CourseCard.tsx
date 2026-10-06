import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Course } from "@/types";
import { loc } from "@/lib/utils";
import { courseCover, splitGallery } from "@/lib/media";
import { CoverImage } from "@/components/ui/CoverImage";
import { CalendarIcon, ImageIcon } from "@/components/ui/icons";

/**
 * A completed course as a piece of evidence: its photograph, its name, its
 * date and how many photographs its gallery holds. The whole card is the link.
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
    <article className="card card-link group flex h-full flex-col overflow-hidden">
      <div className="media-zoom relative aspect-[3/2] overflow-hidden bg-mist">
        <CoverImage
          src={courseCover(course)}
          alt=""
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
        {photos ? (
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-night/65 px-2.5 py-1 text-[0.78125rem] font-medium text-on-dark backdrop-blur-sm">
            <ImageIcon className="h-3.5 w-3.5" />
            {t("photos", { count: photos })}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="t-h4 text-balance text-ink">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="t-meta mt-auto flex items-center gap-2 pt-3 text-muted">
          <CalendarIcon className="h-3.5 w-3.5" />
          {loc(course.date, locale)}
        </p>
      </div>
    </article>
  );
}
