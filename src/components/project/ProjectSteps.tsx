import { getTranslations } from "next-intl/server";
import { projectSteps } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** The six massing steps, read as the order the work happens in. */
export async function ProjectSteps({ locale }: { locale: string }) {
  const t = await getTranslations("Steps");

  return (
    <Section tone="mist" space="compact">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-10 md:mb-12"
        />
        <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectSteps.map((step) => (
            <li key={step.no} className="border-t border-line-strong pt-4">
              <p className="t-meta-sm text-muted tabular-nums">{step.no}</p>
              <p className="mt-2 text-sm leading-6 text-ink">
                {loc(step.title, locale)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
