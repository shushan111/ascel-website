import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImpactChain } from "@/components/impact/ImpactChain";
import { Reasons } from "@/components/impact/Reasons";

/**
 * Why a donation to a building is a donation to care: the chain from walls to
 * patients, then the three reasons with their published figures.
 */
export async function WhyItMatters({ locale }: { locale: string }) {
  const t = await getTranslations("Home");

  return (
    <Section tone="canvas">
      <Container width="wide">
        <SectionHeader eyebrow={t("mattersEyebrow")} title={t("mattersTitle")} size="h1" />
        <ImpactChain className="mt-10 md:mt-14" />
        <Reasons locale={locale} className="mt-12 md:mt-16" />
      </Container>
    </Section>
  );
}
