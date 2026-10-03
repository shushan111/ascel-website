import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A `fill` image, or — when the CMS has no photograph — a quiet typographic
 * tile carrying the item's own title. Never a stock image: a picture that is
 * not of this course or article would be a small untruth.
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
  /** Shown in the fallback tile. */
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-end bg-mist p-5 font-display text-[1.05rem] leading-snug text-muted"
      >
        <span className="line-clamp-3 max-w-[18rem]">{label}</span>
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
