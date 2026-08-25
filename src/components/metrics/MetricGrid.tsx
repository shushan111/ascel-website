import type { Metric } from "@/types";
import { loc } from "@/lib/utils";

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
    <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={invert ? "bg-navy p-6" : "bg-white p-6"}
        >
          <dt
            className={
              invert
                ? "text-xs uppercase tracking-[0.16em] text-white/55"
                : "text-xs uppercase tracking-[0.16em] text-muted"
            }
          >
            {loc(metric.label, locale)}
          </dt>
          <dd
            className={
              invert
                ? "mt-3 text-3xl font-semibold tracking-tight text-white"
                : "mt-3 text-3xl font-semibold tracking-tight text-navy"
            }
          >
            {metric.display}
          </dd>
        </div>
      ))}
    </dl>
  );
}
