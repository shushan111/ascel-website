import { getTranslations } from "next-intl/server";
import { projectSteps } from "@/data/project";
import { loc } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** The six massing steps, read as the order the work happens in. */
export async function ProjectSteps({ locale }: { locale: string }) {
  const t = await getTranslations("Steps");

  return (
    <div>
      <SectionHeader title={t("title")} intro={t("subtitle")} layout="split" as="h3" />
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {projectSteps.map((step) => (
          <li key={step.no} className="card flex items-start gap-4 bg-canvas p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong font-display text-[0.875rem] tabular-nums text-accent-ink">
              {step.no}
            </span>
            <span className="pt-1.5 text-[1.03125rem] leading-snug text-ink">{loc(step.title, locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
