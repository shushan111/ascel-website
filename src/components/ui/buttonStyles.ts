import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDark"
  | "support"
  | "outlineDark";

type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  // Ink fill — the default filled control on a light ground.
  primary:
    "border border-ink bg-ink text-on-dark hover:border-ink-hover hover:bg-ink-hover",
  // Hairline on paper; hover firms the line to ink.
  secondary:
    "border border-line-strong bg-paper text-ink hover:border-ink",
  ghost: "border border-transparent bg-transparent text-ink hover:bg-mist",
  // The light action on dark grounds and photo scrims.
  onDark:
    "border border-on-dark bg-on-dark text-ink hover:border-paper hover:bg-paper",
  outlineDark:
    "border border-on-dark/35 bg-transparent text-on-dark hover:border-on-dark hover:bg-on-dark/8",
  // The support action. Bronze is spent here and almost nowhere else, so the
  // way to give is recognisable on every page. Ink on bronze is 5.6:1.
  support:
    "border border-accent bg-accent text-ink hover:border-accent-hover hover:bg-accent-hover",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-[0.9375rem]",
  md: "min-h-12 px-5.5 text-[0.96875rem]",
  lg: "min-h-14 px-7 text-[1rem]",
};

/**
 * One button recipe for links and buttons alike. Pressing nudges the button
 * down a hair; disabled and aria-busy dim it. Pair with an icon from
 * `ui/icons` — the gap is built in, and a trailing arrow slides on hover when
 * it carries the `btn-arrow` class.
 */
export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
  size: ButtonSize = "md",
) {
  return cn(
    "group/btn inline-flex select-none items-center justify-center gap-2 rounded-sm text-center font-medium tracking-[0.005em]",
    "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-55 aria-busy:pointer-events-none aria-busy:opacity-80",
    "[&_.btn-arrow]:transition-transform [&_.btn-arrow]:duration-200 hover:[&_.btn-arrow]:translate-x-0.5",
    sizes[size],
    variants[variant],
    className,
  );
}
