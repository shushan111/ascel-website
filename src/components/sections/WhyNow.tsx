import { getTranslations } from "next-intl/server";
import { getReasons } from "@/data/reasons";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * The screen directly under the hero: why this building, in this town, now.
 *
 * The three arguments used to be scattered — the war-surgery programme was one
 * card in a list of programmes, the Gyumri location was a clause in an About
 * paragraph, and the nurses school appeared nowhere at all. A donor decides in
 * the first thirty seconds, so they belong here, above everything else.
 *
 * DRAFT — պատվիրատուի հաստատման կարիք ունի. See src/data/reasons.ts: every
 * figure comes from material already in this repo, and the section removes
 * itself if that file is ever emptied.
 */
export async function WhyNow({ locale }: { locale: string }) {
  const reasons = getReasons();
  if (!reasons.length) return null;

  const t = await getTranslations("WhyNow");

  return (
    <Section tone="paper" id="why-now">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />

        <ul className="grid gap-x-10 gap-y-12 md:grid-cols-3 md:gap-y-0">
          {reasons.map((reason, index) => (
            <li key={reason.id} className="h-full">
              <FadeIn delay={index * 0.08} className="h-full">
                <article className="flex h-full flex-col border-t border-line-strong pt-6">
                  {/* The figure carries the claim, so it leads. A reason
                      without one still lines up: the row keeps its height. */}
                  {reason.figure ? (
                    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-[2.6rem] leading-none font-normal tabular-nums text-ink">
                        {reason.figure}
                      </span>
                      {reason.figureLabel ? (
                        <span className="t-meta text-muted">
                          {loc(reason.figureLabel, locale)}
                        </span>
                      ) : null}
                    </p>
                  ) : null}

                  <h3 className="t-h3 mt-6 text-balance text-ink">
                    {loc(reason.title, locale)}
                  </h3>
                  <p className="t-body mt-4 text-muted">
                    {loc(reason.body, locale)}
                  </p>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
