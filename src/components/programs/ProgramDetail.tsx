import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Program } from "@/types";
import { loc } from "@/lib/utils";
import { getProgramHref } from "@/data/programs";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
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
    program.id === "eternal-nation"
      ? common("officialWebsite")
      : common(program.ctaLabel);

  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden bg-navy">
        <Image
          src={program.image}
          alt={loc(program.title, locale)}
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy/70 to-navy/40" />
        <Container className="relative flex min-h-[52vh] flex-col justify-end py-16">
          <Link
            href="/programs"
            className="mb-6 text-sm text-white/70 hover:text-white"
          >
            ← {common("backToPrograms")}
          </Link>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
            {loc(program.category, locale)}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {loc(program.title, locale)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
            {loc(detail ? detail.tagline : program.description, locale)}
          </p>
          {/* Programs with a full profile surface their external CTA at the
              foot of the page instead, so the hero stays uncluttered. */}
          {detail ? null : (
            <div className="mt-8">
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName("donate")}
                >
                  {ctaLabel}
                  <ExternalIcon />
                  <span className="sr-only">{common("externalLink")}</span>
                </a>
              ) : (
                <Link href={cta.href} className={buttonClassName("donate")}>
                  {ctaLabel}
                </Link>
              )}
            </div>
          )}
        </Container>
      </section>

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

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeIn>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              {t("overview")}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              {loc(program.overview, locale)}
            </p>
            {program.relationshipNote ? (
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-6 text-ink">
                {loc(program.relationshipNote, locale)}
              </p>
            ) : null}
          </FadeIn>
          <FadeIn className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              {t("objectives")}
            </h2>
            <ul className="mt-5 space-y-3">
              {program.objectives.map((item) => (
                <li
                  key={item.en}
                  className="border-b border-line pb-3 text-sm leading-6 text-muted"
                >
                  {loc(item, locale)}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              {t("activities")}
            </h2>
            <ul className="mt-5 space-y-3">
              {program.activities.map((item) => (
                <li
                  key={item.en}
                  className="border-b border-line pb-3 text-sm leading-6 text-muted"
                >
                  {loc(item, locale)}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              {t("impact")}
            </h2>
            <ul className="mt-5 space-y-3">
              {program.impact.map((item) => (
                <li key={item.en} className="text-sm leading-6 text-muted">
                  {loc(item, locale)}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-semibold tracking-tight text-navy">
            {t("gallery")}
          </h2>
          <div className="mt-6 grid gap-4">
            {program.gallery.map((src) => (
              <ImageReveal key={src}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={loc(program.title, locale)}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
              </ImageReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
