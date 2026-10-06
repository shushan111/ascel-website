import { projectFigures } from "@/data/project";
import { cn, loc } from "@/lib/utils";

/**
 * The technical indicators from the drawing set, on one panel. Unlike the
 * course metrics these are exact, so they carry no placeholder note.
 */
export function ProjectFigures({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  return (
    <dl className={cn("card grid grid-cols-2 gap-x-6 gap-y-7 p-6 sm:p-8 lg:grid-cols-4", className)}>
      {projectFigures.map((figure) => (
        // dt first for screen readers; the figure still reads first.
        <div key={figure.id} className="flex flex-col-reverse border-l border-line pl-4 sm:pl-5">
          <dt className="t-small mt-2 text-muted">{loc(figure.label, locale)}</dt>
          <dd className="t-figure-sm text-ink">
            {figure.value}
            {figure.unit ? (
              <span className="ml-1 text-[0.5em] text-muted">
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
