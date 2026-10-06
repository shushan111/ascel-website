import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Building → training → professionals → care. The line between the steps is
 * the argument: a donation to walls is a donation to patients. Used on the
 * home, project and donate pages so the wording lives in one place
 * (Home.chain*). DRAFT — the wording needs client approval.
 *
 * A vertical timeline on a phone, a horizontal one from lg; the last step —
 * the outcome — is the one marked in bronze.
 */
export async function ImpactChain({ className }: { className?: string }) {
  const t = await getTranslations("Home");

  const chain = [
    { title: t("chainBuilding"), body: t("chainBuildingBody") },
    { title: t("chainTraining"), body: t("chainTrainingBody") },
    { title: t("chainProfessionals"), body: t("chainProfessionalsBody") },
    { title: t("chainCare"), body: t("chainCareBody") },
  ];

  return (
    <ol className={cn("grid gap-0 lg:grid-cols-4 lg:gap-6", className)}>
      {chain.map((step, index) => {
        const last = index === chain.length - 1;
        return (
          <li key={step.title} className="relative pb-8 last:pb-0 lg:pb-0">
            {/* The connector: down to the next marker on a phone, across from lg. */}
            {last ? null : (
              <span
                aria-hidden="true"
                className="absolute left-[1.0625rem] top-10 bottom-0 w-px bg-line-strong lg:left-12 lg:right-[-1.5rem] lg:top-[1.125rem] lg:bottom-auto lg:h-px lg:w-auto"
              />
            )}
            <FadeIn delay={index * 0.08} className="flex gap-5 lg:flex-col lg:gap-0">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[0.875rem] font-medium tabular-nums",
                  last ? "border-accent bg-accent text-ink" : "border-line-strong bg-paper text-ink",
                )}
              >
                {index + 1}
              </span>
              <div className="pt-1 lg:pt-5 lg:pr-4">
                <h3 className="t-h4 text-ink">{step.title}</h3>
                <p className="t-small mt-1.5 max-w-[18rem] text-muted">{step.body}</p>
              </div>
            </FadeIn>
          </li>
        );
      })}
    </ol>
  );
}
