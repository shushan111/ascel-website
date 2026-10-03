import { cn } from "@/lib/utils";

type SectionTone = "canvas" | "paper" | "mist" | "ink";
type SectionSpace = "compact" | "default" | "spacious";

const tones: Record<SectionTone, string> = {
  // The page's own ground — no border, it simply continues.
  canvas: "bg-canvas text-body",
  // The tinted band: a warm-white panel ruled off from the page above and below.
  paper: "bg-paper text-body border-y border-line",
  mist: "bg-mist text-body border-y border-line",
  ink: "bg-ink text-on-dark",
};

// One vertical rhythm for the whole site.
const spaces: Record<SectionSpace, string> = {
  compact: "py-12 md:py-16",
  default: "py-16 md:py-[4.6rem]",
  spacious: "py-20 md:py-28",
};

export function Section({
  children,
  className,
  id,
  tone = "canvas",
  space = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
  space?: SectionSpace;
}) {
  return (
    <section id={id} className={cn(spaces[space], tones[tone], className)}>
      {children}
    </section>
  );
}
