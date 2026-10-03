import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPrograms } from "@/data/programs";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgramCard } from "@/components/programs/ProgramCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("programsTitle"),
    description: t("programsDescription"),
    path: "/programs",
    locale,
  });
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProgramsPage");
  const programs = await getPrograms();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <ProgramCard
                key={program.id}
                program={program}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
