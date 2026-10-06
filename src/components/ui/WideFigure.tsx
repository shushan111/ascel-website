import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * A wide photograph between the page header and the body: edge to edge on a
 * phone, inset with rounded corners from tablet up, capped at 100rem so it
 * never becomes a billboard on a large screen.
 */
export function WideFigure({
  src,
  alt,
  caption,
  priority = false,
  reveal = false,
  aspect = "aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9]",
  position = "object-center",
  className,
}: {
  src: string;
  alt: string;
  caption?: string | null;
  priority?: boolean;
  /** Ease in on scroll; off for the first image on a page. */
  reveal?: boolean;
  aspect?: string;
  position?: string;
  className?: string;
}) {
  const frame = (
    <div className={cn("relative overflow-hidden bg-mist md:rounded-lg", aspect)}>
      <Image src={src} alt={alt} fill priority={priority} className={cn("object-cover", position)} sizes="(min-width: 1600px) 1536px, 100vw" />
    </div>
  );

  return (
    <figure className={cn("mx-auto max-w-[100rem] md:px-8", className)}>
      {reveal ? <ImageReveal className="md:rounded-lg">{frame}</ImageReveal> : frame}
      {caption ? (
        <figcaption className="t-caption mt-3 px-5 text-muted sm:px-6 md:px-0">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
