import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark";

const variants: Record<ButtonVariant, string> = {
  // Ink fill, white text. The only filled control on a light page — the bronze
  // accent is reserved for small marks and never becomes a background.
  primary:
    "border border-ink bg-ink text-white hover:border-ink-hover hover:bg-ink-hover",
  // Bordered and transparent. Hover firms the border to ink rather than
  // introducing a second colour.
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-paper",
  ghost:
    "border border-transparent bg-transparent text-ink hover:bg-paper",
  // On ink blocks and photo scrims the strongest action is the light one.
  onDark:
    "border border-paper bg-paper text-ink hover:border-canvas hover:bg-canvas",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-[2.7rem] items-center justify-center gap-2 rounded-sm px-[1.15rem] text-center text-[0.9rem] font-semibold tracking-[0.02em] transition-colors duration-200",
    variants[variant],
    className,
  );
}
