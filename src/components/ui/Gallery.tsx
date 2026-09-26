import Image from "next/image";
import type { GalleryImage } from "@/types";
import { loc } from "@/lib/utils";

export function Gallery({
  images,
  locale,
  title,
}: {
  images: GalleryImage[];
  locale: string;
  title: string;
}) {
  if (!images.length) return null;

  return (
    <section className="mt-16">
      <h2 className="t-h2 text-balance text-ink">{title}</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <li key={image.url} className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist">
            <Image
              src={image.url}
              alt={loc(image.alt, locale)}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading={index < 3 ? undefined : "lazy"}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
