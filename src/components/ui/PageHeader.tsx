import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

/**
 * The opening block for inner pages. Title left, intro set lower and to the
 * right on desktop — an editorial asymmetry rather than a centred banner.
 * Every text slot sizes to its content, so draft copy can be replaced
 * without the layout moving.
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
        "pb-12 pt-14 md:pb-16 md:pt-24",
        tone === "canvas" ? "bg-canvas" : "bg-paper",
        className,
      )}
    >
      <Container width="wide" className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {eyebrow ? <p className="t-eyebrow text-muted">{eyebrow}</p> : null}
          <h1 className="t-display mt-5 text-balance text-ink">{title}</h1>
        </div>
        {intro || aside ? (
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            {intro ? <p className="t-lead text-muted">{intro}</p> : null}
            {aside ? <div className={cn(intro && "mt-8")}>{aside}</div> : null}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
