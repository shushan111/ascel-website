import { getTranslations } from "next-intl/server";
import { getIntroMetrics } from "@/data/metrics";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Directly under the hero: proof that this is a working organisation. Only
 * the figures already published in src/data/metrics.ts — large, unboxed, with
 * the shortest possible label.
 */
export async function ProofBand({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const common = await getTranslations("Common");
  const metrics = getIntroMetrics();
  if (!metrics.length) return null;

  return (
    <section className="bg-canvas py-20 md:py-28">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-4">
            <p className="t-eyebrow text-muted">{t("proofEyebrow")}</p>
            <h2 className="t-h2 mt-5 max-w-sm text-balance text-ink">
              {t("proofTitle")}
            </h2>
          </FadeIn>

          <dl className="grid gap-y-0 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:col-span-8 lg:grid-cols-4 lg:gap-x-8">
            {metrics.map((metric, index) => (
              <FadeIn key={metric.id} delay={index * 0.08}>
                {/* A row on a phone (figure, then label beside it) so a long
                    Armenian label gets the full width instead of half. */}
                <div className="flex flex-row-reverse items-baseline justify-end gap-5 border-t border-line py-5 sm:flex-col-reverse sm:items-start sm:gap-0 sm:py-0 sm:pt-6">
                  <dt className="t-small text-muted sm:mt-4 sm:max-w-[12rem]">
                    {loc(metric.label, locale)}
                  </dt>
                  <dd className="t-figure shrink-0 text-ink">{metric.display}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
        <p className="mt-14 max-w-3xl text-[0.82rem] leading-6 text-muted lg:ml-[33.333%] lg:pl-4">
          {common("placeholderMetricsNote")}
        </p>
      </Container>
    </section>
  );
}
