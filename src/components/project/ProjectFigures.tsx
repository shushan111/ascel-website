import { projectFigures } from "@/data/project";
import { cn, loc } from "@/lib/utils";

/**
 * The technical indicators from the drawing set. Unlike the old XX+ metric
 * grid these are real, so they carry no placeholder note.
 */
export function ProjectFigures({
  locale,
  invert = false,
  className,
}: {
  locale: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {projectFigures.map((figure) => (
        <div
          key={figure.id}
          className={cn(
            "border-t pt-5",
            invert ? "border-on-dark/25" : "border-line-strong",
          )}
        >
          <dd
            className={cn(
              "font-display text-[2rem] leading-none font-semibold tabular-nums",
              invert ? "text-on-dark" : "text-ink",
            )}
          >
            {figure.value}
            {figure.unit ? (
              <span
                className={cn(
                  "ml-1.5 text-base font-normal",
                  invert ? "text-on-dark/65" : "text-muted",
                )}
              >
                {figure.unit}
              </span>
            ) : null}
          </dd>
          <dt
            className={cn(
              "mt-3 text-sm leading-6",
              invert ? "text-on-dark/75" : "text-muted",
            )}
          >
            {loc(figure.label, locale)}
          </dt>
        </div>
      ))}
    </dl>
  );
}
