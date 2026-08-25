import { cn } from "@/lib/utils";

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("h-3.5 w-3.5 shrink-0", className)}
    >
      <path
        fill="currentColor"
        d="M6.5 3H3.75C2.78 3 2 3.78 2 4.75v7.5C2 13.22 2.78 14 3.75 14h7.5c.97 0 1.75-.78 1.75-1.75V9.5H12v2.75c0 .14-.11.25-.25.25h-7.5a.25.25 0 0 1-.25-.25v-7.5c0-.14.11-.25.25-.25H6.5V3Zm7.5 0h-4.25v1.5H12.44L8.22 8.72l1.06 1.06 4.22-4.22V7.5H15V3.75A.75.75 0 0 0 14.25 3H14Z"
      />
    </svg>
  );
}
