import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
  invert = false,
}: {
  className?: string;
  compact?: boolean;
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 40 40"
        className={cn("h-10 w-10 shrink-0", invert ? "text-white" : "text-navy")}
        aria-hidden="true"
      >
        <rect
          x="1.25"
          y="1.25"
          width="37.5"
          height="37.5"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M10 30.5 20 9.5 30 30.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 21.5h11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="16.2" r="1.6" fill="currentColor" />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-semibold tracking-[0.22em]",
            invert ? "text-white" : "text-navy",
          )}
        >
          ASCEL
        </span>
        {compact ? null : (
          <span
            className={cn(
              "mt-1 hidden max-w-[11rem] text-[10px] leading-snug tracking-[0.04em] sm:block lg:hidden 2xl:block",
              invert ? "text-white/60" : "text-muted",
            )}
          >
            Armenian Simulation Center
          </span>
        )}
      </span>
    </span>
  );
}
