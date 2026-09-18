import { cn } from "@/lib/utils";

/**
 * Editorial wrapper for CMS-authored long-form copy. The typography itself
 * lives in `.prose-ascel` in globals.css so it also applies to rich text that
 * arrives as raw markup rather than as React children.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("prose-ascel", className)}>{children}</div>;
}
