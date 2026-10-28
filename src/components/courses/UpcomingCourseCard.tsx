import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Course } from "@/types";
import { cn, loc } from "@/lib/utils";
import { courseCover } from "@/lib/media";
import { COURSE_FALLBACK_IMAGE } from "@/lib/courseFallback";
import { CoverImage } from "@/components/ui/CoverImage";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon, CalendarIcon, ExternalIcon, MapPinIcon } from "@/components/ui/icons";

/**
 * A course on the calendar: the one card on the site that carries the
 * accent. Date and place up front, registration as the primary action when
 * the course has a form. Used on the home page and the courses index.
 */
export async function UpcomingCourseCard({
  course,
  locale,
  className,
}: {
  course: Course;
  locale: string;
  className?: string;
}) {
  const t = await getTranslations("CoursesPage");
  const common = await getTranslations("Common");
  const title = loc(course.title, locale);
  const location = loc(course.location, locale);
  const description = loc(course.description, locale);
  const cover = courseCover(course);

  return (
    <article className={cn("card grid overflow-hidden md:grid-cols-12", className)}>
      {/* Every course shows a picture: its photograph, or the shared illustration. */}
      <div className="relative aspect-[16/9] bg-mist md:col-span-5 md:aspect-auto md:min-h-[17rem]">
        <CoverImage
          src={cover}
          alt=""
          fallbackSrc={COURSE_FALLBACK_IMAGE}
          fallbackAlt={t("fallbackAlt")}
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>
      <div className="flex flex-col p-6 sm:p-8 md:col-span-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent" dot>
            {t("upcoming")}
          </Badge>
          {loc(course.type, locale) ? <Badge>{loc(course.type, locale)}</Badge> : null}
        </div>
        <h3 className="t-h3 mt-4 text-balance text-ink">
          <Link href={`/courses/${course.slug}`} className="transition-colors hover:text-accent-ink">
            {title}
          </Link>
        </h3>
        {description ? <p className="t-small mt-3 line-clamp-3 text-muted">{description}</p> : null}
        <ul className="t-meta mt-5 flex flex-col gap-2 text-ink sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li className="flex items-center gap-2">
            <CalendarIcon className="text-accent-ink" />
            {loc(course.date, locale)}
          </li>
          {location ? (
            <li className="flex items-center gap-2">
              <MapPinIcon className="text-accent-ink" />
              {location}
            </li>
          ) : null}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {course.registrationUrl ? (
            <a href={course.registrationUrl} target="_blank" rel="noopener noreferrer" className={buttonClassName("primary")}>
              {common("register")}
              <ExternalIcon className="h-3.5 w-3.5" />
              <span className="sr-only">{common("externalLink")}</span>
            </a>
          ) : null}
          <Link
            href={`/courses/${course.slug}`}
            className={buttonClassName(course.registrationUrl ? "secondary" : "primary")}
          >
            {common("learnMore")}
            <ArrowRightIcon className="btn-arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
