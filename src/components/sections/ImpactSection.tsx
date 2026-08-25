import { getTranslations } from "next-intl/server";
import { getImpactMetrics } from "@/data/metrics";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricGrid } from "@/components/metrics/MetricGrid";

export async function ImpactSection({ locale }: { locale: string }) {
  const t = await getTranslations("ImpactHome");
  const common = await getTranslations("Common");
  const metrics = getImpactMetrics();

  return (
    <Section tone="canvas">
      <Container>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <MetricGrid metrics={metrics} locale={locale} />
        <p className="mt-4 text-xs text-muted">{common("placeholderMetricsNote")}</p>
      </Container>
    </Section>
  );
}
