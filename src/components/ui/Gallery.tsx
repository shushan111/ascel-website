import Image from "next/image";
import type { GalleryImage } from "@/types";
import { cn, loc } from "@/lib/utils";
import { imageSize } from "@/lib/media";

/**
 * A course or article gallery. The first photograph leads at double size;
 * the rest follow in an even grid. Real event photography is the strongest
 * proof the site has, so it is shown large rather than as thumbnails.
 */
export function Gallery({
  images,
  locale,
  title,
  className,
}: {
  images: GalleryImage[];
  locale: string;
  title: string;
  className?: string;
}) {
  if (!images.length) return null;
  // Only a large frame leads at double size; a 448px photo would blur.
  const leadSize = imageSize(images[0].url);
  const lead = !leadSize || leadSize.width >= 1000;

  return (
    <section className={cn(className)}>
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="t-h2 text-ink">{title}</h2>
        <p className="t-meta text-muted tabular-nums">{images.length}</p>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <li
            key={image.url}
            className={cn(
              "relative overflow-hidden bg-mist",
              index === 0 && lead ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]",
            )}
          >
            <a href={image.url} target="_blank" rel="noopener noreferrer" className="group block h-full w-full">
              <Image
                src={image.url}
                alt={loc(image.alt, locale)}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes={index === 0 && lead ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                loading={index < 5 ? undefined : "lazy"}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
