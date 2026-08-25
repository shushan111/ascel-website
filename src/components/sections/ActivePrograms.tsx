import { getTranslations } from "next-intl/server";
import { getPrograms } from "@/data/programs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProgramCard } from "@/components/programs/ProgramCard";

export async function ActivePrograms({ locale }: { locale: string }) {
  const t = await getTranslations("ProgramsHome");
  const programs = getPrograms();

  return (
    <Section tone="canvas" id="programs">
      <Container>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
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
  );
}
