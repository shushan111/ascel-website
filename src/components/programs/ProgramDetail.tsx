import { getTranslations } from "next-intl/server";
import type { Program } from "@/types";
import { loc } from "@/lib/utils";
import { getProgramHref } from "@/data/programs";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { WideFigure } from "@/components/ui/WideFigure";
import { FactList } from "@/components/ui/FactList";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon, ExternalIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProgramProfile } from "@/components/programs/ProgramProfile";
import { programPhotos } from "@/data/work";
import { getCoursesByDate } from "@/lib/courseIndex";

export async function ProgramDetail({
  program,
  locale,
}: {
  program: Program;
  locale: string;
}) {
  const common = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const t = await getTranslations("ProgramsPage");
  const detail = program.detail;
  const cta = getProgramHref(program);
  const ctaLabel =
    program.slug === "eternal-nation"
      ? common("officialWebsite")
      : common(program.ctaLabel);

  const photos = programPhotos[program.slug] ?? [];
  // Every course in the archive is a Gyumri Orthopedic School course.
  const coursesHeld =
    program.slug === "gyumri-orthopedic-school"
      ? (await getCoursesByDate()).filter((course) => course.status === "past")
      : [];

  const ctaButton = detail ? null : cta.external ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={buttonClassName("primary")}>
      {ctaLabel}
      <ExternalIcon className="h-3.5 w-3.5" />
      <span className="sr-only">{common("externalLink")}</span>
    </a>
  ) : (
    <Link href={cta.href} className={buttonClassName("primary")}>
      {ctaLabel}
      <ArrowRightIcon className="btn-arrow" />
    </Link>
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: nav("programs"), href: "/programs" }, { label: loc(program.shortTitle, locale) }]}
        meta={<Badge>{loc(program.category, locale)}</Badge>}
        title={loc(program.title, locale)}
        intro={loc(detail ? detail.tagline : program.description, locale)}
        actions={ctaButton}
        aside={
          detail?.facts.length ? (
            <FactList
              title={t("keyFacts")}
              facts={detail.facts.map((fact) => ({ label: loc(fact.label, locale), value: loc(fact.value, locale) }))}
            />
          ) : undefined
        }
      />

      <WideFigure src={program.image} alt={loc(program.title, locale)} priority />

      {detail ? (
        <ProgramProfile detail={detail} locale={locale} photos={photos} coursesHeld={coursesHeld} />
      ) : (
        <ProgramSummary program={program} locale={locale} />
      )}
    </>
  );
}

async function ProgramSummary({
  program,
  locale,
}: {
  program: Program;
  locale: string;
}) {
  const t = await getTranslations("ProgramsPage");

  const lists = [
    [t("objectives"), program.objectives],
    [t("activities"), program.activities],
    [t("impact"), program.impact],
  ] as const;

  return (
    <Section>
      <Container width="wide">
        <FadeIn className="max-w-3xl">
          <h2 className="t-h2 text-balance text-ink">{t("overview")}</h2>
          <p className="t-lead mt-5 text-muted">{loc(program.overview, locale)}</p>
          {program.relationshipNote ? (
            <p className="t-small mt-6 border-l-2 border-accent pl-4 text-muted">
              {loc(program.relationshipNote, locale)}
            </p>
          ) : null}
        </FadeIn>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 lg:gap-6">
          {lists.map(([heading, items], index) => (
            <FadeIn key={heading} delay={index * 0.06} className="card h-full p-6 sm:p-7">
              <h3 className="t-h4 text-balance text-ink">{heading}</h3>
              <ul className="mt-4 divide-y divide-line">
                {items.map((item) => (
                  <li key={item.en} className="t-small py-3 text-muted first:pt-0 last:pb-0">
                    {loc(item, locale)}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
