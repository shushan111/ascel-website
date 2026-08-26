import { getTranslations } from "next-intl/server";
import type { ProgramDetailContent } from "@/types";
import { cn, loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { FadeIn } from "@/components/motion/FadeIn";

function SectionTitle({
  children,
  invert = false,
}: {
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight text-balance sm:text-3xl",
        invert ? "text-white" : "text-navy",
      )}
    >
      {children}
    </h2>
  );
}

/**
 * Long-form body for a program that has a full profile in `Program.detail`.
 * Rendered below the shared program hero.
 */
export async function ProgramProfile({
  detail,
  locale,
}: {
  detail: ProgramDetailContent;
  locale: string;
}) {
  const common = await getTranslations("Common");

  return (
    <>
      <section className="border-b border-line bg-canvas py-10 md:py-12">
        <Container>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {detail.facts.map((fact) => (
              <div key={fact.label.en}>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  {loc(fact.label, locale)}
                </dt>
                <dd className="mt-2 text-base font-medium leading-6 text-navy">
                  {loc(fact.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.about.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.about.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-base leading-7 text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-6">
            <SectionTitle>{loc(detail.mission.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.mission.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-base leading-7 text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-6">
            <ol className="space-y-4">
              {detail.mission.points.map((point, index) => (
                <li
                  key={point.en}
                  className="flex gap-4 border-t border-line pt-4"
                >
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold tabular-nums text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-ink">
                    {loc(point, locale)}
                  </span>
                </li>
              ))}
            </ol>
          </FadeIn>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.education.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.education.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-base leading-7 text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {detail.education.formats.map((format, index) => (
              <FadeIn key={format.title.en} delay={index * 0.06}>
                <article className="flex h-full flex-col border border-line bg-white p-6 transition-colors duration-300 hover:border-navy/25">
                  <h3 className="text-base font-semibold tracking-tight text-navy">
                    {loc(format.title, locale)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {loc(format.description, locale)}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.audience.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.audience.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-base leading-7 text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {detail.audience.groups.map((group, index) => (
              <li key={group.title.en} className="h-full">
                <FadeIn delay={index * 0.06} className="h-full">
                  <div className="flex h-full flex-col border-t-2 border-accent bg-white p-6">
                    <h3 className="text-base font-semibold tracking-tight text-navy">
                      {loc(group.title, locale)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {loc(group.description, locale)}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.focusAreas.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.focusAreas.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-base leading-7 text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {detail.focusAreas.areas.map((area, index) => (
              <li key={area.title.en} className="h-full">
                <FadeIn delay={index * 0.05} className="h-full">
                  <div className="flex h-full flex-col border border-line bg-canvas p-6 transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="text-base font-semibold tracking-tight text-navy">
                      {loc(area.title, locale)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {loc(area.description, locale)}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle invert>
              {loc(detail.highlights.title, locale)}
            </SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.highlights.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-base leading-7 text-white/70"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <ol className="mt-12 space-y-0">
            {detail.highlights.milestones.map((milestone, index) => (
              <li key={milestone.title.en}>
                <FadeIn delay={Math.min(index, 4) * 0.05}>
                  <div className="grid gap-3 border-t border-white/15 py-7 md:grid-cols-12 md:gap-8">
                    <p className="text-sm font-medium tabular-nums text-white/80 md:col-span-3">
                      {loc(milestone.date, locale)}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="text-lg font-semibold tracking-tight text-white text-balance">
                        {loc(milestone.title, locale)}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
                        {loc(milestone.description, locale)}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <FadeIn>
            <div className="border border-line bg-white px-6 py-12 text-center sm:px-10 md:py-16">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                {loc(detail.cta.eyebrow, locale)}
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-navy text-balance sm:text-3xl">
                {loc(detail.cta.title, locale)}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
                {loc(detail.cta.body, locale)}
              </p>
              <div className="mt-9 flex justify-center">
                <a
                  href={detail.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName(
                    "donate",
                    "w-full min-h-12 sm:w-auto sm:px-8",
                  )}
                >
                  {loc(detail.cta.label, locale)}
                  <ExternalIcon />
                  <span className="sr-only">{common("externalLink")}</span>
                </a>
              </div>
              <p className="mx-auto mt-9 max-w-2xl border-t border-line pt-7 text-xs leading-6 text-muted">
                {loc(detail.sourceNote, locale)}
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
