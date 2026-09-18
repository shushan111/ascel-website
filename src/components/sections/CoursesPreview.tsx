import { getTranslations } from "next-intl/server";
import { getCourses } from "@/data/courses";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CourseCard } from "@/components/courses/CourseCard";

export async function CoursesPreview({ locale }: { locale: string }) {
  const t = await getTranslations("CoursesHome");
  const courses = (await getCourses()).slice(0, 3);

  return (
    <Section tone="paper">
      <Container>
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          action={<ArrowLink href="/courses">{t("viewAll")}</ArrowLink>}
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
