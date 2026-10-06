import { getTranslations } from "next-intl/server";
import { fundraising } from "@/data/fundraising";
import { hasDonationAmounts } from "@/data/donation";
import type { DonationOption } from "@/types";
import { cn, loc } from "@/lib/utils";

/**
 * Where support goes, in build order, as numbered tiles. Area and cost appear
 * only when the data carries them; costs only once `hasDonationAmounts()` is
 * true, so six "to be confirmed" labels never show.
 */
export async function DonationCategories({
  options,
  locale,
  invert = false,
  columns = 3,
}: {
  options: DonationOption[];
  locale: string;
  /** Set on a dark section; every other placement renders light. */
  invert?: boolean;
  columns?: 2 | 3;
}) {
  const page = await getTranslations("DonatePage");
  const showAmounts = hasDonationAmounts();
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: fundraising.currency,
    maximumFractionDigits: 0,
  });

  return (
    <ol className={cn("grid gap-3 sm:grid-cols-2 lg:gap-4", columns === 3 && "lg:grid-cols-3")}>
      {options.map((option, index) => {
        const area = option.area && option.area !== "—" ? option.area : null;
        const meta = [
          area ? `${area} ${page("areaUnit")}` : null,
          showAmounts && option.amount !== null ? money.format(option.amount) : null,
        ].filter(Boolean);
        return (
          <li
            key={option.id}
            className={cn(
              "flex flex-col rounded-md border p-5 sm:p-6",
              invert ? "border-night-line bg-night-soft" : "border-line bg-paper",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "font-display text-[0.9375rem] tabular-nums",
                  invert ? "text-accent-light" : "text-accent-ink",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {meta.length ? (
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[0.8125rem] tabular-nums",
                    invert ? "border-night-line text-on-dark/80" : "border-line text-ink",
                  )}
                >
                  {meta.join(" · ")}
                </span>
              ) : null}
            </div>
            <p className={cn("t-h4 mt-4", invert ? "text-on-dark" : "text-ink")}>{loc(option.title, locale)}</p>
            <p className={cn("t-small mt-2", invert ? "text-on-dark/65" : "text-muted")}>
              {loc(option.description, locale)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
