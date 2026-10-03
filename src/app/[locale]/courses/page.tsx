import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getCoursesByDate, courseSortKey } from "@/lib/courseIndex";
import { loc } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { buttonClassName } from "@/components/ui/buttonStyles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("coursesTitle"),
    description: t("coursesDescription"),
    path: "/courses",
    locale,
    image: "/images/work/exfix2022-hands-on.webp",
  });
}

/**
 * Two clearly different things: what is coming (a short, emphatic list with
 * dates and registration) and what has been done (an archive by year, photo
 * first, as proof of work).
 */
export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CoursesPage");
  const common = await getTranslations("Common");
  const courses = await getCoursesByDate();
  const upcoming = courses.filter((course) => course.status === "upcoming").reverse();
  const completed = courses.filter((course) => course.status === "past");

  const byYear = new Map<number, typeof completed>();
  for (const course of completed) {
    const year = Math.floor(courseSortKey(course) / 10000) || 0;
    byYear.set(year, [...(byYear.get(year) ?? []), course]);
  }

  return (
    <>
      {/* DRAFT — պատվիրատուի հաստատման կարիք ունի (intro) */}
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      {upcoming.length ? (
        <section className="bg-canvas pb-16 md:pb-24">
          <Container width="wide">
            <h2 className="flex items-center gap-3 border-t border-ink pt-4 text-[0.95rem] text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {t("upcoming")}
            </h2>
            <ul>
              {upcoming.map((course) => (
                <li key={course.id} className="grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                  <p className="font-display text-[1.6rem] font-normal leading-tight text-ink lg:col-span-3">
                    {loc(course.date, locale)}
                  </p>
                  <div className="lg:col-span-6">
                    <h3 className="t-h2 text-balance text-ink">
                      <Link href={`/courses/${course.slug}`} className="transition-colors duration-300 hover:text-accent-ink">
                        {loc(course.title, locale)}
                      </Link>
                    </h3>
                    {loc(course.location, locale) ? (
                      <p className="t-small mt-3 text-muted">{loc(course.location, locale)}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
                    {course.registrationUrl ? (
                      <a href={course.registrationUrl} target="_blank" rel="noopener noreferrer" className={buttonClassName("primary")}>
                        {common("register")}
                      </a>
                    ) : null}
                    <Link href={`/courses/${course.slug}`} className={buttonClassName("secondary")}>
                      {common("learnMore")}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="bg-paper py-20 md:py-28">
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <h2 className="t-h1 text-ink lg:col-span-6">{t("completed")}</h2>
            <p className="t-body text-muted lg:col-span-4 lg:col-start-9 lg:self-end">{t("completedIntro")}</p>
          </div>

          {[...byYear.entries()].map(([year, items]) => (
            <div key={year} className="mt-16 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-10">
              <h3 className="font-display text-[2.2rem] font-normal leading-none text-muted tabular-nums lg:col-span-2">
                {year || ""}
              </h3>
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-10 lg:grid-cols-3">
                {items.map((course) => (
                  <CourseCard key={course.id} course={course} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
