import { getTranslations } from "next-intl/server";
import { projectSteps } from "@/data/project";
import { loc } from "@/lib/utils";

/** The six massing steps, read as the order the work happens in. */
export async function ProjectSteps({ locale }: { locale: string }) {
  const t = await getTranslations("Steps");

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <h3 className="t-h2 text-ink">{t("title")}</h3>
        <p className="t-small max-w-md text-muted">{t("subtitle")}</p>
      </div>
      <ol className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {projectSteps.map((step) => (
          <li key={step.no} className="flex gap-5 border-t border-line py-5">
            <span className="font-display text-[1.6rem] font-normal leading-none text-muted tabular-nums">
              {step.no}
            </span>
            <span className="text-[1.02rem] leading-snug text-ink">{loc(step.title, locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
