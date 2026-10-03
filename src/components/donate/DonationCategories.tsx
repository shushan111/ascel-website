import { getTranslations } from "next-intl/server";
import { fundraising } from "@/data/fundraising";
import { hasDonationAmounts } from "@/data/donation";
import type { DonationOption } from "@/types";
import { cn, loc } from "@/lib/utils";

/**
 * Where support goes, in build order. Numbered rows rather than cards. Area
 * and cost appear only when the data carries them; costs only once
 * `hasDonationAmounts()` is true, so six "to be confirmed" labels never show.
 */
export async function DonationCategories({
  options,
  locale,
  invert = false,
  showTitle = true,
}: {
  options: DonationOption[];
  locale: string;
  /** Set on a dark section; every other placement renders light. */
  invert?: boolean;
  showTitle?: boolean;
}) {
  const t = await getTranslations("DonateHome");
  const page = await getTranslations("DonatePage");
  const showAmounts = hasDonationAmounts();
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: fundraising.currency,
    maximumFractionDigits: 0,
  });

  return (
    <div>
      {showTitle ? (
        <h3 className={cn("t-eyebrow", invert ? "text-on-dark/80" : "text-muted")}>
          {t("categoriesTitle")}
        </h3>
      ) : null}
      <ol className={cn("grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3", showTitle && "mt-8")}>
        {options.map((option, index) => {
          const area = option.area && option.area !== "—" ? option.area : null;
          return (
            <li
              key={option.id}
              className={cn("flex gap-5 border-t py-6", invert ? "border-on-dark/20" : "border-line")}
            >
              <span
                className={cn(
                  "font-display text-[1.5rem] font-normal leading-none tabular-nums",
                  invert ? "text-on-dark/50" : "text-muted",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className={cn("t-h4", invert ? "text-on-dark" : "text-ink")}>
                  {loc(option.title, locale)}
                </p>
                <p className={cn("t-small mt-2", invert ? "text-on-dark/70" : "text-muted")}>
                  {loc(option.description, locale)}
                </p>
                {area || (showAmounts && option.amount !== null) ? (
                  <p className={cn("t-meta mt-3", invert ? "text-on-dark/80" : "text-ink")}>
                    {[
                      area ? `${area} ${page("areaUnit")}` : null,
                      showAmounts && option.amount !== null ? money.format(option.amount) : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
