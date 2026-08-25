import { getTranslations } from "next-intl/server";
import type { DonationOption } from "@/types";
import { loc } from "@/lib/utils";

export async function DonationCategories({
  options,
  locale,
}: {
  options: DonationOption[];
  locale: string;
}) {
  const t = await getTranslations("DonateHome");

  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white/55">
        {t("categoriesTitle")}
      </h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <li key={option.id} className="border border-white/15 p-5">
            <p className="font-medium text-white">{loc(option.title, locale)}</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              {loc(option.description, locale)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
