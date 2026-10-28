import type { GalleryImage, LocalizedString } from "@/types";
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
  credit,
  lead: leadOverride,
  className,
}: {
  images: Array<GalleryImage & { caption?: LocalizedString; width?: number }>;
  locale: string;
  title: string;
  /** One source line under the grid, e.g. "Photographs: AnklePro". */
  credit?: string;
  /** Force the double-size first tile on or off; by default it depends on size and count. */
  lead?: boolean;
  className?: string;
}) {
  if (!images.length) return null;
  const leadSize = images[0].width ? { width: images[0].width } : imageSize(images[0].url);
  const lead = leadOverride ?? (images.length > 4 && (!leadSize || leadSize.width >= 1000));

  return (
    <section className={cn(className)}>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <h2 className="t-h3 text-ink">{title}</h2>
        <p className="t-meta tabular-nums text-muted">{images.length}</p>
      </div>
      <div className="mt-6">
        <Lightbox
          lead={lead}
          images={images.map((image) => ({
            src: image.url,
            alt: loc(image.alt, locale),
            caption: image.caption ? loc(image.caption, locale) : undefined,
          }))}
        />
      </div>
      {credit ? <p className="t-caption mt-4 text-muted">{credit}</p> : null}
    </section>
  );
}
