import { cn } from "@/lib/utils";

/**
 * A chapter mark for long pages: number and name on a rule. Reads as a table
 * of contents entry, so a long page has a visible structure without a nav.
 */
export function Chapter({
  no,
  label,
  invert = false,
  className,
}: {
  no: string;
  label: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-baseline gap-4 border-t pt-4 text-[0.95rem]",
        invert ? "border-on-dark/25 text-on-dark/70" : "border-ink/70 text-muted",
        className,
      )}
    >
      <span className={cn("tabular-nums", invert ? "text-accent-light" : "text-ink")}>{no}</span>
      <span>{label}</span>
    </p>
  );
}
