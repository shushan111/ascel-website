import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

/**
 * The single opening block for every inner page.
 *
 * Replaces the full-bleed ink slab that each page used to repeat: the
 * reference site keeps inner pages light throughout, and a light header is
 * also what makes long pages read calmly. Depth comes from the hairline rule
 * and the tone change, not from a dark band.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
  tone = "canvas",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
  tone?: "canvas" | "paper";
  className?: string;
}) {
  return (
    <header
      className={cn(
        // Old: pt-10 pb-8 md:pt-[2.8rem] md:pb-6 — 44.8px above an h1 that is
        // now 48px tall. The opening block gets the same air as a section.
        "pt-12 pb-10 md:pt-20 md:pb-14",
        tone === "canvas" ? "bg-canvas" : "bg-paper",
        className,
      )}
    >
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="t-eyebrow mb-4 text-accent">{eyebrow}</p>
          ) : null}
          <h1 className="t-display text-balance text-ink">{title}</h1>
          {intro ? (
            <p className="t-lead mt-6 max-w-[36rem] text-muted">{intro}</p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </Container>
    </header>
  );
}
