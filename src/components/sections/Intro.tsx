import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getIntroMetrics } from "@/data/metrics";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MetricGrid } from "@/components/metrics/MetricGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

export async function Intro({ locale }: { locale: string }) {
  const t = await getTranslations("Intro");
  const common = await getTranslations("Common");
  const metrics = getIntroMetrics();

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <h2 className="t-h2 text-balance text-ink">{t("title")}</h2>
            <p className="t-body mt-6 max-w-xl text-muted">{t("body")}</p>
          </FadeIn>
          <ImageReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist">
              <Image
                src="/images/about-intro.webp"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </ImageReveal>
        </div>
        <div className="mt-16 md:mt-20">
          <MetricGrid metrics={metrics} locale={locale} />
          <p className="mt-5 text-xs leading-5 text-muted">
            {common("placeholderMetricsNote")}
          </p>
        </div>
      </Container>
    </Section>
  );
}
