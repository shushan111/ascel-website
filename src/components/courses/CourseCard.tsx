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

  return (
    <article className="flex h-full flex-col border border-line bg-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={course.image}
          alt={loc(course.title, locale)}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        {course.isPlaceholder ? (
          <span className="absolute left-3 top-3 bg-white/95 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-navy">
            {common("sample")}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          {loc(course.type, locale)}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-navy">
          {loc(course.title, locale)}
        </h3>
        <dl className="mt-4 grid gap-2 text-sm text-muted">
          <div>
            <dt className="inline text-ink/70">{t("date")}: </dt>
            <dd className="inline">{loc(course.date, locale)}</dd>
          </div>
          <div>
            <dt className="inline text-ink/70">{t("location")}: </dt>
            <dd className="inline">{loc(course.location, locale)}</dd>
          </div>
          <div>
            <dt className="inline text-ink/70">{t("instructor")}: </dt>
            <dd className="inline">{loc(course.instructor, locale)}</dd>
          </div>
        </dl>
        <p className="mt-4 flex-1 text-sm leading-6 text-muted">
          {loc(course.description, locale)}
        </p>
        <div className="mt-6">
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
            <span className={buttonClassName("secondary", "pointer-events-none opacity-70")}>
              {common("registrationPending")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
