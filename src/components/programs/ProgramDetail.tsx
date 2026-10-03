import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Program } from "@/types";
import { loc } from "@/lib/utils";
import { getProgramHref } from "@/data/programs";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { buttonClassName } from "@/components/ui/buttonStyles";
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
  const t = await getTranslations("ProgramsPage");

  return (
    <>
      <header className="bg-canvas pb-12 pt-10 md:pb-16 md:pt-14">
        <Container width="wide">
          <Link
            href="/programs"
            className="inline-flex min-h-9 items-center gap-2 text-[0.92rem] text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            {common("backToPrograms")}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="t-eyebrow text-muted">{loc(program.category, locale)}</p>
              <h1 className="t-display mt-5 text-balance text-ink">{loc(program.title, locale)}</h1>
              <p className="t-lead mt-7 max-w-[38rem] text-muted">
                {loc(detail ? detail.tagline : program.description, locale)}
              </p>
              {detail ? null : (
                <div className="mt-8">
                  {cta.external ? (
                    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={buttonClassName("secondary")}>
                      {ctaLabel}
                      <ExternalIcon />
                      <span className="sr-only">{common("externalLink")}</span>
                    </a>
                  ) : (
                    <Link href={cta.href} className={buttonClassName("secondary")}>
                      {ctaLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>
            {/* The programme's facts beside the title: dates and scale first. */}
            {detail?.facts.length ? (
              <dl className="self-end border-t border-ink/70 lg:col-span-4 lg:col-start-9">
                <p className="sr-only">{t("keyFacts")}</p>
                {detail.facts.map((fact, index) => (
                  <div key={index} className="flex justify-between gap-6 border-b border-line py-3.5">
                    <dt className="text-[0.92rem] text-muted">{loc(fact.label, locale)}</dt>
                    <dd className="text-right text-[0.98rem] text-ink">{loc(fact.value, locale)}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </Container>
      </header>

      <div className="mx-auto max-w-[100rem] md:px-8">
        <div className="relative aspect-[4/3] bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
          <Image
            src={program.image}
            alt={loc(program.title, locale)}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

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
          <p className="t-body mt-5 text-muted">{loc(program.overview, locale)}</p>
          {program.relationshipNote ? (
            <p className="t-small mt-7 border-t border-line pt-5 text-muted">
              {loc(program.relationshipNote, locale)}
            </p>
          ) : null}
        </FadeIn>

        {/* The three lists read better side by side now that the gallery
            column is gone — on a phone they simply stack. */}
        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {lists.map(([heading, items], index) => (
            <FadeIn key={heading} delay={index * 0.06}>
              <h2 className="t-h3 text-balance text-ink">{heading}</h2>
              <ul className="mt-5 border-t border-line">
                {items.map((item) => (
                  <li
                    key={item.en}
                    className="border-b border-line py-4 text-sm leading-6 text-muted"
                  >
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
