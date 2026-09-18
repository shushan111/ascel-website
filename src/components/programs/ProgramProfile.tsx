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
        "t-h2 text-balance",
        invert ? "text-on-dark" : "text-ink",
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
      <section className="border-y border-line bg-canvas py-10 md:py-12">
        <Container>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {detail.facts.map((fact) => (
              <div key={fact.label.en}>
                <dt className="t-meta-sm text-accent">
                  {loc(fact.label, locale)}
                </dt>
                <dd className="mt-2 text-base font-medium leading-6 text-ink">
                  {loc(fact.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.about.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.about.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="t-body text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-6">
            <SectionTitle>{loc(detail.mission.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.mission.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="t-body text-muted"
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
                  className="flex gap-5 border-t border-line pt-5"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-semibold tabular-nums text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="t-small text-ink">
                    {loc(point, locale)}
                  </span>
                </li>
              ))}
            </ol>
          </FadeIn>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.education.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.education.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="t-body text-muted"
                >
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {detail.education.formats.map((format, index) => (
              <FadeIn key={format.title.en} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-md border border-line bg-paper p-6 transition-colors duration-300 hover:border-ink">
                  <h3 className="t-h4 text-ink">
                    {loc(format.title, locale)}
                  </h3>
                  <p className="t-small mt-3 text-muted">
                    {loc(format.description, locale)}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.audience.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.audience.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="t-body text-muted"
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
                  <div className="flex h-full flex-col border-t-2 border-accent bg-paper pt-5">
                    <h3 className="t-h4 text-ink">
                      {loc(group.title, locale)}
                    </h3>
                    <p className="t-small mt-3 text-muted">
                      {loc(group.description, locale)}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.focusAreas.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.focusAreas.body.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="t-body text-muted"
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
                  <div className="flex h-full flex-col rounded-md border border-line bg-canvas p-6 transition-colors duration-300 hover:border-ink">
                    <h3 className="t-h4 text-ink">
                      {loc(area.title, locale)}
                    </h3>
                    <p className="t-small mt-3 text-muted">
                      {loc(area.description, locale)}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Was a second full-width dark slab. A milestone list reads better on a
          light ground anyway, and the page no longer carries two dark blocks. */}
      <Section tone="paper">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionTitle>{loc(detail.highlights.title, locale)}</SectionTitle>
            <div className="mt-6 space-y-5">
              {detail.highlights.body.map((paragraph) => (
                <p key={paragraph.en} className="t-body text-muted">
                  {loc(paragraph, locale)}
                </p>
              ))}
            </div>
          </FadeIn>
          <ol className="mt-12 space-y-0">
            {detail.highlights.milestones.map((milestone, index) => (
              <li key={milestone.title.en}>
                <FadeIn delay={Math.min(index, 4) * 0.05}>
                  <div className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-8">
                    <p className="t-meta-sm tabular-nums text-accent md:col-span-3 md:pt-1">
                      {loc(milestone.date, locale)}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="t-h3 text-balance text-ink">
                        {loc(milestone.title, locale)}
                      </h3>
                      <p className="t-small mt-3 max-w-3xl text-muted">
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

      <Section tone="paper">
        <Container>
          <FadeIn>
            <div className="rounded-md border border-line bg-paper px-6 py-14 text-center sm:px-10 md:py-20">
              <p className="t-meta-sm text-accent">
                {loc(detail.cta.eyebrow, locale)}
              </p>
              <h2 className="t-h2 mx-auto mt-4 max-w-2xl text-balance text-ink">
                {loc(detail.cta.title, locale)}
              </h2>
              <p className="t-body mx-auto mt-5 max-w-xl text-muted">
                {loc(detail.cta.body, locale)}
              </p>
              <div className="mt-9 flex justify-center">
                <a
                  href={detail.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName(
                    "primary",
                    "w-full min-h-12 sm:w-auto sm:px-8",
                  )}
                >
                  {loc(detail.cta.label, locale)}
                  <ExternalIcon />
                  <span className="sr-only">{common("externalLink")}</span>
                </a>
              </div>
              <p className="mx-auto mt-10 max-w-2xl border-t border-line pt-7 text-xs leading-6 text-muted">
                {loc(detail.sourceNote, locale)}
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
