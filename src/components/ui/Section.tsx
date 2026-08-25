import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "canvas" | "navy";
}) {
  const tones = {
    white: "bg-white text-ink",
    canvas: "bg-canvas text-ink",
    navy: "bg-navy text-white",
  };

  return (
    <section id={id} className={cn("py-20 md:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}
