import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCourses } from "@/data/courses";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CourseCard } from "@/components/courses/CourseCard";

export async function CoursesPreview({ locale }: { locale: string }) {
  const t = await getTranslations("CoursesHome");
  const courses = getCourses().slice(0, 3);

  return (
    <Section tone="canvas">
      <Container>
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Link
              href="/courses"
              className="text-sm font-medium text-navy underline-offset-4 hover:underline"
            >
              {t("viewAll")}
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
