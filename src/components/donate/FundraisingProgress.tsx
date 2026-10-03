import { getTranslations } from "next-intl/server";
import { fundraising, hasProgress, progressPercent } from "@/data/fundraising";

/**
 * Raised against goal. Renders nothing until `fundraising.showProgress` is on
 * and both figures are real — see src/data/fundraising.ts.
 */
export async function FundraisingProgress({ locale }: { locale: string }) {
  if (!hasProgress()) return null;
  const t = await getTranslations("DonatePage");
  const percent = progressPercent() ?? 0;
  const format = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: fundraising.currency,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="mt-10">
      <div className="h-1 w-full bg-line" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
      <dl className="mt-4 flex flex-wrap justify-between gap-4 text-[0.95rem]">
        <div>
          <dt className="text-muted">{t("raised")}</dt>
          <dd className="font-display text-[1.6rem] text-ink">{format(fundraising.raised as number)}</dd>
        </div>
        <div className="text-right">
          <dt className="text-muted">{t("goal")}</dt>
          <dd className="font-display text-[1.6rem] text-ink">{format(fundraising.goal as number)}</dd>
        </div>
      </dl>
      {fundraising.lastUpdated ? (
        <p className="mt-2 text-[0.85rem] text-muted">
          {t("updated", {
            date: new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(fundraising.lastUpdated)),
          })}
        </p>
      ) : null}
    </div>
  );
}
