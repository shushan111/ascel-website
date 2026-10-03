import { getTranslations } from "next-intl/server";
import type { DonationOption } from "@/types";
import { cn, loc } from "@/lib/utils";

export async function DonationCategories({
  options,
  locale,
  invert = false,
}: {
  options: DonationOption[];
  locale: string;
  /** Set on the one ink section; every other placement renders light. */
  invert?: boolean;
}) {
  const t = await getTranslations("DonateHome");

  return (
    <div>
      <h3 className={cn("t-eyebrow", invert ? "text-accent-light" : "text-accent")}>
        {t("categoriesTitle")}
      </h3>
      <ul className="mt-7 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <li
            key={option.id}
            className={cn(
              "border-t pt-5",
              invert ? "border-on-dark/25" : "border-line-strong",
            )}
          >
            <p className={cn("t-h4", invert ? "text-on-dark" : "text-ink")}>
              {loc(option.title, locale)}
            </p>
            <p
              className={cn(
                "t-small mt-3",
                invert ? "text-on-dark/75" : "text-muted",
              )}
            >
              {loc(option.description, locale)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
