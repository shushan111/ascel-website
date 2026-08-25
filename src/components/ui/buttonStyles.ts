import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "donate" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-deep border border-navy",
  secondary:
    "bg-transparent text-navy border border-navy/20 hover:border-navy hover:bg-navy/[0.03]",
  donate:
    "bg-accent text-white hover:bg-accent-hover border border-accent",
  ghost:
    "bg-transparent text-navy hover:bg-navy/[0.04] border border-transparent",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-center text-sm font-medium tracking-wide transition-colors duration-200",
    variants[variant],
    className,
  );
}
