"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "./useReveal";

export function ImageReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("reveal-image overflow-hidden", className)}>
      {children}
    </div>
  );
}
