import { getReasons } from "@/data/reasons";
import { cn, loc } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * The three reasons from src/data/reasons.ts, each led by its published
 * figure. Removes itself if the data file is emptied.
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
    <ul className={cn("grid gap-12 md:grid-cols-3 md:gap-10", className)}>
      {reasons.map((reason, index) => (
        <li key={reason.id}>
          <FadeIn delay={index * 0.08}>
            {reason.figure ? (
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-[2.8rem] font-normal leading-none tracking-[-0.03em] text-ink tabular-nums">
                  {reason.figure}
                </span>
                {reason.figureLabel ? (
                  <span className="t-meta text-muted">{loc(reason.figureLabel, locale)}</span>
                ) : null}
              </p>
            ) : null}
            <h3 className="t-h3 mt-5 text-balance text-ink">{loc(reason.title, locale)}</h3>
            <p className="t-body mt-4 text-muted">{loc(reason.body, locale)}</p>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
