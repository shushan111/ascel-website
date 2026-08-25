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
        "mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 text-xs font-medium uppercase tracking-[0.22em]",
              invert ? "text-white/55" : "text-accent",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
            invert ? "text-white" : "text-navy",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-7",
              invert ? "text-white/70" : "text-muted",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
