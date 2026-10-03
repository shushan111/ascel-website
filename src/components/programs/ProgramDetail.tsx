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

  return (
    <>
      {/* Same light opening as news articles and the simulation centre, so
          every inner page enters the same way. */}
      <header className="bg-canvas pt-10 pb-14 md:pt-14 md:pb-16">
        <Container>
          <Link
            href="/programs"
            className="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                fill="currentColor"
                d="m7.3 3.3.8.8L4.8 7.4h8.7v1.2H4.8l3.3 3.3-.8.8L2.6 8 7.3 3.3Z"
              />
            </svg>
            {common("backToPrograms")}
          </Link>

          <div className="mt-8 max-w-2xl">
            <p className="t-eyebrow text-accent">
              {loc(program.category, locale)}
            </p>
            <h1 className="t-display mt-4 text-balance text-ink">
              {loc(program.title, locale)}
            </h1>
            <p className="t-lead mt-6 text-muted">
              {loc(detail ? detail.tagline : program.description, locale)}
            </p>
          </div>

          {/* Programs with a full profile surface their external CTA at the
              foot of the page instead, so the opening stays uncluttered. */}
          {detail ? null : (
            <div className="mt-8">
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName("primary")}
                >
                  {ctaLabel}
                  <ExternalIcon />
                  <span className="sr-only">{common("externalLink")}</span>
                </a>
              ) : (
                <Link href={cta.href} className={buttonClassName("primary")}>
                  {ctaLabel}
                </Link>
              )}
            </div>
          )}
        </Container>
      </header>

      <Container className="mt-10 md:mt-14">
        <div className="relative aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9] overflow-hidden rounded-md bg-mist">
          <Image
            src={program.image}
            alt={loc(program.title, locale)}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1136px, 100vw"
          />
        </div>
      </Container>

      {detail ? (
        <ProgramProfile detail={detail} locale={locale} />
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
      <Container>
        <FadeIn className="max-w-3xl">
          <h2 className="t-h2 text-balance text-ink">{t("overview")}</h2>
          <p className="t-body mt-5 text-muted">{loc(program.overview, locale)}</p>
          {program.relationshipNote ? (
            <p className="t-small mt-7 border-l-2 border-accent pl-5 text-ink">
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
