import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "accent" | "ok" | "dark";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line bg-paper text-muted",
  // Upcoming — the one state that earns the accent.
  accent: "border-accent/40 bg-accent-soft text-accent-ink",
  ok: "border-ok/25 bg-ok-soft text-ok",
  dark: "border-on-dark/20 bg-night/70 text-on-dark backdrop-blur-sm",
};

/** A short status or category label. Pill-shaped: the one round element. */
export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  /** A live dot before the label, for "upcoming". */
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-[0.8125rem] font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
