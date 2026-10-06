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
    <div className="card mt-8 p-5 sm:p-6">
      <dl className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <dt className="t-small text-muted">{t("raised")}</dt>
          <dd className="t-figure-sm mt-1 text-ink">{format(fundraising.raised as number)}</dd>
        </div>
        <div className="text-right">
          <dt className="t-small text-muted">{t("goal")}</dt>
          <dd className="mt-1 font-display text-[1.25rem] text-muted">{format(fundraising.goal as number)}</dd>
        </div>
      </dl>
      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-mist"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t("raised")}
      >
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
      {fundraising.lastUpdated ? (
        <p className="t-caption mt-3 text-muted">
          {t("updated", {
            date: new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(fundraising.lastUpdated)),
          })}
        </p>
      ) : null}
    </div>
  );
}
