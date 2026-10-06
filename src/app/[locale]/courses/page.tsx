import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getCoursesByDate, courseSortKey } from "@/lib/courseIndex";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { YearFilter } from "@/components/ui/YearFilter";
import { CalendarIcon } from "@/components/ui/icons";
import { CourseCard } from "@/components/courses/CourseCard";
import { UpcomingCourseCard } from "@/components/courses/UpcomingCourseCard";

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
 * Two clearly different things: what is coming (emphatic cards with dates and
 * registration) and what has been done (an archive by year, photo first, as
 * proof of work, filterable by year).
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
  const nav = await getTranslations("Nav");
  const home = await getTranslations("Home");
  const courses = await getCoursesByDate();
  const upcoming = courses.filter((course) => course.status === "upcoming").reverse();
  const completed = courses.filter((course) => course.status === "past");

  const byYear = new Map<number, typeof completed>();
  for (const course of completed) {
    const year = Math.floor(courseSortKey(course) / 10000) || 0;
    byYear.set(year, [...(byYear.get(year) ?? []), course]);
  }

  const groups = [...byYear.entries()].map(([year, items]) => ({
    year,
    count: items.length,
    content: (
      <section aria-labelledby={`year-${year}`}>
        <div className="flex items-baseline gap-4 border-b border-line pb-3">
          <h3 id={`year-${year}`} className="t-figure-sm text-ink">
            {year || "—"}
          </h3>
          <span className="t-meta text-muted">{home("coursesCount", { count: items.length })}</span>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {items.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} locale={locale} />
            </li>
          ))}
        </ul>
      </section>
    ),
  }));

  return (
    <>
      <PageHeader breadcrumbs={[{ label: nav("courses") }]} title={t("title")} intro={t("intro")} />

      {upcoming.length ? (
        <Section space="none" className="pb-14 md:pb-20">
          <Container width="wide">
            <h2 className="t-label mb-4 flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
              {t("upcoming")}
            </h2>
            <div className="space-y-4">
              {upcoming.map((course) => (
                <UpcomingCourseCard key={course.id} course={course} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="paper">
        <Container width="wide">
          <SectionHeader layout="split" title={t("completed")} intro={t("completedIntro")} size="h1" />
          <div className="mt-10 md:mt-12">
            {groups.length ? (
              <YearFilter groups={groups} />
            ) : (
              <EmptyState icon={<CalendarIcon className="h-5 w-5" />} title={common("emptyCoursesTitle")} />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
