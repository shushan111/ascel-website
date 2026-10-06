import { getTranslations } from "next-intl/server";
import { getPrograms } from "@/data/programs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeIn } from "@/components/motion/FadeIn";
import { PartnerRow, ProgramCard } from "@/components/programs/ProgramCard";

/**
 * The organisation's own programmes, side by side so they can be compared at
 * a glance, then partner organisations as a quieter row — related, not the
 * same entity, and not given equal visual weight.
 */
export async function WhatWeDo({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");
  const programs = await getPrograms();
  if (!programs.length) return null;

  const own = programs.filter((program) => program.detail || program.hasOnSiteProfile);
  const partners = programs.filter((program) => !own.includes(program));

  return (
    <Section id="programs" space="default">
      <Container width="wide">
        <SectionHeader
          eyebrow={t("whatEyebrow")}
          title={t("whatTitle")}
          action={<ArrowLink href="/programs">{nav("programs")}</ArrowLink>}
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 lg:gap-6">
          {own.map((program, index) => (
            <FadeIn key={program.id} delay={index * 0.08} className="h-full">
              <ProgramCard program={program} locale={locale} />
            </FadeIn>
          ))}
        </div>

        {partners.length ? (
          <div className="mt-5 space-y-5 lg:mt-6">
            {partners.map((program) => (
              <PartnerRow key={program.id} program={program} locale={locale} />
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
