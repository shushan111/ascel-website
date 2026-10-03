import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Building → training → professionals → care. The line between the steps is
 * the argument: a donation to walls is a donation to patients. Used on the
 * home page, the center page and the donate page so the wording lives in one
 * place (Home.chain*). DRAFT — the wording needs client approval.
 */
export async function ImpactChain({
  className,
  surface = "paper",
}: {
  className?: string;
  /** The ground the chain sits on, so the hollow markers cut the line. */
  surface?: "paper" | "canvas";
}) {
  const t = await getTranslations("Home");

  const chain = [
    { title: t("chainBuilding"), body: t("chainBuildingBody") },
    { title: t("chainTraining"), body: t("chainTrainingBody") },
    { title: t("chainProfessionals"), body: t("chainProfessionalsBody") },
    { title: t("chainCare"), body: t("chainCareBody") },
  ];

  return (
    <ol className={cn("grid md:grid-cols-2 md:gap-y-14 lg:grid-cols-4 lg:gap-y-0", className)}>
      {chain.map((step, index) => (
        <li key={step.title} className="relative">
          <FadeIn delay={index * 0.1} className="h-full">
            <div className="h-full border-l border-line pb-10 pl-6 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-8">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[4px] top-0 h-[9px] w-[9px] rounded-full md:-top-[4px] md:left-0",
                  index === chain.length - 1
                    ? "bg-accent"
                    : cn("border border-ink/40", surface === "paper" ? "bg-paper" : "bg-canvas"),
                )}
              />
              <p className="t-meta text-muted">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="t-h3 mt-2 text-ink">{step.title}</h3>
              <p className="t-small mt-3 max-w-[16rem] text-muted">{step.body}</p>
            </div>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
