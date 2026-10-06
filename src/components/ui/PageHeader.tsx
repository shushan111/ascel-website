import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * The opening block for every inner page, so each one answers "where am I"
 * the same way: breadcrumbs, then the title.
 *
 * - Without an `aside`, the intro sits lower and to the right on desktop — an
 *   editorial asymmetry rather than a centred banner.
 * - With an `aside` (a facts panel, a status card), the intro moves under the
 *   title and the aside takes the right column.
 *
 * `meta` is a row above the title (status badges, a date); `actions` sits
 * under the intro.
 */
export async function PageHeader({
  breadcrumbs,
  eyebrow,
  meta,
  title,
  intro,
  actions,
  aside,
  tone = "canvas",
  className,
}: {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  meta?: React.ReactNode;
  title: string;
  intro?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: "canvas" | "paper";
  className?: string;
}) {
  const introBeside = Boolean(intro) && !aside;

  return (
    <header
      className={cn(
        "pb-12 md:pb-16",
        breadcrumbs ? "pt-4 md:pt-6" : "pt-12 md:pt-20",
        tone === "canvas" ? "bg-canvas" : "bg-paper",
        className,
      )}
    >
      <Container width="wide">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-12 lg:gap-10",
            breadcrumbs && "mt-6 md:mt-10",
          )}
        >
          <div className="lg:col-span-7">
            {eyebrow ? <p className="t-eyebrow mb-5 text-muted">{eyebrow}</p> : null}
            {meta ? <div className="mb-5 flex flex-wrap items-center gap-2">{meta}</div> : null}
            <h1 className="t-display text-balance text-ink">{title}</h1>
            {intro && !introBeside ? (
              <p className="t-lead mt-6 max-w-(--measure) text-muted">{intro}</p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {introBeside ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="t-lead text-muted">{intro}</p>
            </div>
          ) : null}
          {aside ? (
            <div className="lg:col-span-5 lg:col-start-8 lg:self-end xl:col-span-4 xl:col-start-9">
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
