import { cn } from "@/lib/utils";

export type Fact = { label: string; value: React.ReactNode };

/**
 * Key facts as label/value rows. `panel` puts them on a paper card (beside a
 * page title, in a sidebar); `plain` is the bare ruled list for use inside a
 * section that already has its own surface.
 */
export function FactList({
  facts,
  title,
  variant = "panel",
  footer,
  className,
}: {
  facts: Fact[];
  /** A visible heading for the panel; screen readers get it either way. */
  title?: string;
  variant?: "panel" | "plain";
  /** Actions under the rows: a register button, a link. */
  footer?: React.ReactNode;
  className?: string;
}) {
  if (!facts.length && !footer) return null;

  return (
    <div className={cn(variant === "panel" && "card p-5 sm:p-6", className)}>
      {title ? <p className="t-meta-sm mb-2 text-muted">{title}</p> : null}
      <dl className="divide-y divide-line">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(6.5rem,40%)_1fr] gap-4 py-3 first:pt-1 last:pb-1"
          >
            <dt className="text-[0.9375rem] leading-6 text-muted">{fact.label}</dt>
            <dd className="text-[0.96875rem] leading-6 text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {footer ? <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">{footer}</div> : null}
    </div>
  );
}
