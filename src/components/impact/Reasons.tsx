import { getReasons } from "@/data/reasons";
import { cn, loc } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * The three reasons from src/data/reasons.ts, each a card led by its
 * published figure. Removes itself if the data file is emptied.
 */
export function Reasons({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const reasons = getReasons();
  if (!reasons.length) return null;

  return (
    <ul className={cn("grid gap-4 md:grid-cols-3 lg:gap-6", className)}>
      {reasons.map((reason, index) => (
        <li key={reason.id}>
          <FadeIn delay={index * 0.08} className="card flex h-full flex-col p-6 sm:p-7">
            {reason.figure ? (
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-5">
                <span className="t-figure text-ink">{reason.figure}</span>
                {reason.figureLabel ? (
                  <span className="t-small text-muted">{loc(reason.figureLabel, locale)}</span>
                ) : null}
              </p>
            ) : null}
            <h3 className="t-h4 mt-5 text-balance text-ink">{loc(reason.title, locale)}</h3>
            <p className="t-small mt-2.5 text-muted">{loc(reason.body, locale)}</p>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
