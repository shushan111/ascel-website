import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p
            className={cn(
              "t-eyebrow mb-3",
              invert ? "text-accent-light" : "text-accent-ink",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn("t-h2 text-balance", invert ? "text-on-dark" : "text-ink")}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "t-body mt-4 max-w-xl",
              invert ? "text-on-dark/75" : "text-muted",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
