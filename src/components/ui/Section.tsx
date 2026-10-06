import { cn } from "@/lib/utils";

type SectionTone = "canvas" | "paper" | "mist" | "ink";
type SectionSpace = "compact" | "default" | "spacious" | "none";

const tones: Record<SectionTone, string> = {
  // The page's own ground.
  canvas: "bg-canvas text-body",
  // The tinted band: tone change alone separates it from its neighbours.
  paper: "bg-paper text-body",
  mist: "bg-mist text-body",
  ink: "bg-night text-on-dark",
};

// One vertical rhythm for the whole site, from the --spacing-band tokens.
const spaces: Record<SectionSpace, string> = {
  compact: "py-14 md:py-band-compact",
  default: "py-16 md:py-band",
  spacious: "py-20 md:py-band-wide",
  none: "",
};

export function Section({
  children,
  className,
  id,
  tone = "canvas",
  space = "default",
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
  space?: SectionSpace;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(spaces[space], tones[tone], id && "scroll-mt-(--header-h)", className)}
    >
      {children}
    </section>
  );
}
