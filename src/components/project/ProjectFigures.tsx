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
            // dt first for screen readers; the figure still reads first.
            "flex flex-col-reverse border-t pt-5",
            invert ? "border-on-dark/25" : "border-line",
          )}
        >
          <dt
            className={cn(
              "mt-3 text-sm leading-6",
              invert ? "text-on-dark/75" : "text-muted",
            )}
          >
            {loc(figure.label, locale)}
          </dt>
          <dd
            className={cn(
              "font-display text-[2.4rem] leading-none font-normal tracking-[-0.02em] tabular-nums",
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
                {/* The drawings label areas in Armenian; other locales get m². */}
                {locale === "hy" ? figure.unit : "m²"}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
