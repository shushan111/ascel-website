import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Course } from "@/types";
import { loc } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";

export async function CourseCard({
  course,
  locale,
}: {
  course: Course;
  locale: string;
}) {
  const t = await getTranslations("CoursesPage");
  const common = await getTranslations("Common");

  const rows = [
    [t("date"), loc(course.date, locale)],
    [t("location"), loc(course.location, locale)],
    [t("instructor"), loc(course.instructor, locale)],
  ] as const;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Image
          src={course.image}
          alt={loc(course.title, locale)}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {course.isPlaceholder ? (
          <span className="t-meta-sm absolute left-3 top-3 rounded-sm bg-paper/95 px-2 py-1 text-ink">
            {common("sample")}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="t-meta-sm text-accent">{loc(course.type, locale)}</p>
        <h3 className="t-h4 mt-3 text-balance text-ink">
          {loc(course.title, locale)}
        </h3>
        <dl className="mt-5 space-y-2.5 text-sm leading-6">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-wrap gap-x-2">
              <dt className="min-w-0 shrink-0 text-muted">{label}:</dt>
              <dd className="min-w-0 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="t-small mt-5 flex-1 text-muted">
          {loc(course.description, locale)}
        </p>
        <div className="mt-7">
          {course.registrationUrl ? (
            <a
              href={course.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName("primary")}
            >
              {common("register")}
            </a>
          ) : (
            <span
              className={buttonClassName(
                "secondary",
                "pointer-events-none opacity-65",
              )}
            >
              {common("registrationPending")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
