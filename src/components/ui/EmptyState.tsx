import { cn } from "@/lib/utils";

/**
 * What a list shows when the CMS has nothing for it yet: a quiet dashed
 * panel with a sentence and, optionally, the way on. Never a blank gap.
 */
export function EmptyState({
  title,
  body,
  action,
  icon,
  className,
}: {
  title: string;
  body?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-dashed border-line-strong px-6 py-14 text-center md:py-20",
        className,
      )}
    >
      {icon ? (
        <span className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-mist text-muted">{icon}</span>
      ) : null}
      <p className="t-h4 max-w-md text-balance text-ink">{title}</p>
      {body ? <p className="t-small mt-2 max-w-md text-muted">{body}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
