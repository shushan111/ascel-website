import type { GalleryImage } from "@/types";
import { cn, loc } from "@/lib/utils";
import { imageSize } from "@/lib/media";
import { Lightbox } from "@/components/ui/Lightbox";

/**
 * A course or article gallery. The first photograph leads at double size when
 * it is large enough not to blur; every tile opens the lightbox. Real event
 * photography is the strongest proof the site has, so it is shown large.
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
  const leadSize = imageSize(images[0].url);
  const lead = images.length > 4 && (!leadSize || leadSize.width >= 1000);

  return (
    <section className={cn(className)}>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <h2 className="t-h3 text-ink">{title}</h2>
        <p className="t-meta tabular-nums text-muted">{images.length}</p>
      </div>
      <div className="mt-6">
        <Lightbox
          lead={lead}
          images={images.map((image) => ({ src: image.url, alt: loc(image.alt, locale) }))}
        />
      </div>
    </section>
  );
}
