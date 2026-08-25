import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CourseCard } from "@/components/courses/CourseCard";

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
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CoursesPage");
  const courses = getCourses();

  return (
    <>
      <section className="bg-navy py-20 md:py-28">
        <Container className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-7 text-white/70">{t("intro")}</p>
        </Container>
      </section>
      <Section tone="canvas">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
