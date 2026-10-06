import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * The heading block every section opens with: eyebrow, title, an optional
 * intro and an optional action (usually an ArrowLink). Two layouts:
 *
 * - `stack` (default): eyebrow, title and intro in one column, the action
 *   aligned to the bottom-right on desktop.
 * - `split`: title left, intro right — for sections whose intro is a
 *   sentence of context rather than a subtitle.
 *
 * One component, so every section on every page lines up the same way.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  layout = "stack",
  size = "h2",
  invert = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  layout?: "stack" | "split";
  size?: "h1" | "h2" | "h3";
  invert?: boolean;
  as?: "h2" | "h3";
  className?: string;
}) {
  const titleClass = cn(
    size === "h1" ? "t-h1" : size === "h3" ? "t-h3" : "t-h2",
    "text-balance",
    invert ? "text-on-dark" : "text-ink",
  );
  const introClass = cn("t-body", invert ? "text-on-dark/75" : "text-muted");
  const eyebrowNode = eyebrow ? (
    <p className={cn("t-eyebrow mb-4", invert ? "text-accent-light" : "text-muted")}>
      {eyebrow}
    </p>
  ) : null;

  if (layout === "split") {
    return (
      <FadeIn
        className={cn(
          "grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10",
          className,
        )}
      >
        <div className="lg:col-span-7">
          {eyebrowNode}
          <Heading className={titleClass}>{title}</Heading>
        </div>
        {intro || action ? (
          <div className="lg:col-span-4 lg:col-start-9">
            {intro ? <p className={introClass}>{intro}</p> : null}
            {action ? <div className={cn(intro && "mt-4")}>{action}</div> : null}
          </div>
        ) : null}
      </FadeIn>
    );
  }

  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrowNode}
        <Heading className={titleClass}>{title}</Heading>
        {intro ? <p className={cn(introClass, "mt-4 max-w-xl")}>{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
    </FadeIn>
  );
}
