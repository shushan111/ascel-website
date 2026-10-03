import { getTranslations } from "next-intl/server";
import { getTrustFacts } from "@/data/trust";
import { loc } from "@/lib/utils";

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
      <dl className="mt-6 border-t border-line">
        {facts.map((fact) => (
          <div key={fact.id} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
            <dt className="text-[0.95rem] text-muted">{loc(fact.label, locale)}</dt>
            <dd className="text-[1rem] text-ink">{fact.value ? loc(fact.value, locale) : null}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
