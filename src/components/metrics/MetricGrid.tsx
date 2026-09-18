import type { Metric } from "@/types";
import { cn, loc } from "@/lib/utils";

export function MetricGrid({
  metrics,
  locale,
  invert = false,
}: {
  metrics: Metric[];
  locale: string;
  invert?: boolean;
}) {
  return (
    // The reference's stat row: one ruled band, hairline dividers between the
    // figures, nothing boxed.
    <dl
      className={cn(
        "grid grid-cols-2 border-y sm:grid-cols-4",
        invert ? "border-on-dark/20" : "border-line bg-paper",
      )}
    >
      {metrics.map((metric, index) => (
        <div
          key={metric.id}
          className={cn(
            "px-4 py-[1.15rem] sm:px-5",
            invert ? "border-on-dark/20" : "border-line",
            // Dividers only between cells: every other one at 2-up, all but
            // the last at 4-up.
            index % 2 === 0 && "border-r",
            index < metrics.length - 2 && "border-b sm:border-b-0",
            "sm:border-r sm:last:border-r-0",
          )}
        >
          <dd
            className={cn(
              "font-display text-[1.7rem] font-semibold tracking-[-0.03em] tabular-nums",
              invert ? "text-on-dark" : "text-ink",
            )}
          >
            {metric.display}
          </dd>
          <dt
            className={cn(
              "mt-1 text-[0.82rem] font-semibold tracking-[0.04em]",
              invert ? "text-on-dark/70" : "text-muted",
            )}
          >
            {loc(metric.label, locale)}
          </dt>
        </div>
      ))}
    </dl>
  );
}
