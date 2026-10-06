import { cn } from "@/lib/utils";

/**
 * A chapter mark for long pages: number and name. Reads as a table of
 * contents entry, so a long page has a visible structure, and matches the
 * labels in the page's sticky section bar.
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
        "flex items-center gap-3 text-[0.9375rem]",
        invert ? "text-on-dark/70" : "text-muted",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-8 min-w-8 place-items-center rounded-full border px-2 font-display text-[0.8125rem] tabular-nums",
          invert ? "border-on-dark/30 text-accent-light" : "border-line-strong text-accent-ink",
        )}
      >
        {no}
      </span>
      <span>{label}</span>
    </p>
  );
}
