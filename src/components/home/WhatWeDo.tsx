import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProgramHref, getPrograms } from "@/data/programs";
import type { Program } from "@/types";
import { cn, loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

function ProgramLink({
  program,
  label,
  externalLabel,
  className,
}: {
  program: Program;
  label: string;
  externalLabel: string;
  className?: string;
}) {
  const target = getProgramHref(program);
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-2 border-b border-ink/30 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:border-ink",
    className,
  );
  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        <ExternalIcon />
        <span className="sr-only">{externalLabel}</span>
      </a>
    );
  }
  return (
    <Link href={target.href} className={classes}>
      {label}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

/**
 * The programmes, as an editorial sequence rather than a card grid: each of
 * the organisation's own programmes gets a large photograph and a short text,
 * alternating sides. Partner organisations follow as a quiet text row — they
 * are related, not the same entity, and are not given equal visual weight.
 */
export async function WhatWeDo({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const common = await getTranslations("Common");
  const programs = await getPrograms();
  if (!programs.length) return null;

  const own = programs.filter((program) => program.detail || program.hasOnSiteProfile);
  const partners = programs.filter((program) => !own.includes(program));

  return (
    <section id="programs" className="bg-paper py-24 md:py-band">
      <Container width="wide">
        <FadeIn className="max-w-2xl">
          <p className="t-eyebrow text-muted">{t("whatEyebrow")}</p>
          <h2 className="t-h1 mt-5 text-balance text-ink">{t("whatTitle")}</h2>
        </FadeIn>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-32">
          {own.map((program, index) => {
            const flip = index % 2 === 1;
            return (
              <article
                key={program.id}
                className="grid items-center gap-8 md:gap-12 lg:grid-cols-12 lg:gap-16"
              >
                <ImageReveal
                  className={cn(
                    "lg:col-span-7",
                    flip && "lg:order-2 lg:col-start-6",
                  )}
                >
                  <div className="relative aspect-[3/2] bg-mist">
                    <Image
                      src={program.image}
                      alt={loc(program.title, locale)}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </ImageReveal>
                <FadeIn
                  className={cn(
                    "lg:col-span-5 lg:max-w-md",
                    flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:col-start-9 lg:col-span-4",
                  )}
                >
                  <p className="t-small text-muted">{loc(program.category, locale)}</p>
                  <h3 className="t-h2 mt-3 text-balance text-ink">
                    {loc(program.title, locale)}
                  </h3>
                  <p className="t-body mt-5 text-body">
                    {loc(program.description, locale)}
                  </p>
                  <ProgramLink
                    program={program}
                    label={common(program.ctaLabel)}
                    externalLabel={common("externalLink")}
                    className="mt-8"
                  />
                </FadeIn>
              </article>
            );
          })}
        </div>

        {partners.length ? (
          <ul className="mt-20 border-t border-line md:mt-28">
            {partners.map((program) => (
              <li
                key={program.id}
                className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-10"
              >
                <p className="t-small text-muted md:col-span-3">
                  {t("partnerLabel")}
                </p>
                <div className="md:col-span-6">
                  <h3 className="t-h3 text-ink">{loc(program.title, locale)}</h3>
                  <p className="t-small mt-3 max-w-xl text-muted">
                    {loc(program.description, locale)}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <ProgramLink
                    program={program}
                    label={common(program.ctaLabel)}
                    externalLabel={common("externalLink")}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
