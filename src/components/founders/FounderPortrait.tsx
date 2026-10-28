import Image from "next/image";
import { cn } from "@/lib/utils";

/** Initials for a founder without a portrait: first letters of first and last name. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * One frame for every founder: a 4:5 portrait, or — when no approved
 * photograph exists — the initials set in the display face on the same
 * ground, so a row mixing the two still reads as one set.
 */
export function FounderPortrait({
  src,
  alt,
  name,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  name: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-md bg-accent-soft ring-1 ring-line", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          {/* A faint ring, the same hairline the site draws elsewhere. */}
          <span className="absolute aspect-square w-[64%] rounded-full border border-line-strong/70" />
          <span className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] tracking-[0.06em] text-accent-ink">
            {initials(name)}
          </span>
        </div>
      )}
    </div>
  );
}
