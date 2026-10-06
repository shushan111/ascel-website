import { getTranslations } from "next-intl/server";
import { getTrustFacts } from "@/data/trust";
import { loc } from "@/lib/utils";
import { FactList } from "@/components/ui/FactList";

/**
 * Legal entity, governance, reporting. Only confirmed rows render, and the
 * panel removes itself while none are — see src/data/trust.ts.
 */
export async function TrustPanel({ locale, className }: { locale: string; className?: string }) {
  const facts = getTrustFacts();
  if (!facts.length) return null;
  const t = await getTranslations("DonatePage");

  return (
    <div className={className}>
      <h3 className="t-h3 text-ink">{t("trustTitle")}</h3>
      <FactList
        className="mt-5"
        facts={facts.map((fact) => ({
          label: loc(fact.label, locale),
          value: fact.value ? loc(fact.value, locale) : null,
        }))}
      />
    </div>
  );
}
