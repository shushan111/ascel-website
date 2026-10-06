import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A `fill` image, or — when the CMS has no photograph — a quiet typographic
 * tile carrying the item's own title on a faint monogram. Never a stock
 * image: a picture that is not of this course or article would be a small
 * untruth.
 */
export function CoverImage({
  src,
  alt,
  sizes,
  label,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Shown in the fallback tile. Leave out where the title is printed beside the image anyway. */
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex flex-col bg-linear-to-br from-mist to-sand p-5",
          label ? "justify-between" : "items-center justify-center",
        )}
      >
        <svg viewBox="0 0 40 40" className={cn("text-line-strong", label ? "h-8 w-8" : "h-12 w-12")}>
          <path d="M10 30.5 20 9.5 30 30.5M14.5 21.5h11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {label ? (
          <span className="line-clamp-3 max-w-[18rem] font-display text-[1.05rem] leading-snug text-muted">{label}</span>
        ) : null}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
