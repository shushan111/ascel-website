import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "support" | "outlineDark";

const variants: Record<ButtonVariant, string> = {
  // Ink fill — the default filled control on a light ground.
  primary:
    "border border-ink bg-ink text-on-dark hover:border-ink-hover hover:bg-ink-hover",
  // Hairline and transparent; hover firms the line to ink.
  secondary:
    "border border-ink/25 bg-transparent text-ink hover:border-ink",
  ghost: "border border-transparent bg-transparent text-ink hover:bg-paper",
  // The light action on dark grounds and photo scrims.
  onDark:
    "border border-on-dark bg-on-dark text-ink hover:border-paper hover:bg-paper",
  outlineDark:
    "border border-on-dark/40 bg-transparent text-on-dark hover:border-on-dark",
  // The support action. Bronze is spent here and almost nowhere else, so the
  // way to give is recognisable on every page without shouting. Ink on
  // bronze is 5.6:1.
  support:
    "border border-accent bg-accent text-ink hover:border-accent-hover hover:bg-accent-hover",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 text-center text-[0.96875rem] font-medium tracking-[0.005em] transition-colors duration-300",
    variants[variant],
    className,
  );
}
