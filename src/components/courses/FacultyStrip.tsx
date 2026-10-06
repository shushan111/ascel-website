import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { GalleryImage } from "@/types";
import { loc } from "@/lib/utils";

/**
 * The course's faculty headshots, kept small and together. Shown at gallery
 * size they read as a wall of faces and push the course photographs down.
 */
export async function FacultyStrip({
  images,
  locale,
  className,
}: {
  images: GalleryImage[];
  locale: string;
  className?: string;
}) {
  if (!images.length) return null;
  const t = await getTranslations("CoursesPage");

  return (
    <section className={className}>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <h2 className="t-h3 text-ink">{t("faculty")}</h2>
        <p className="t-meta tabular-nums text-muted">{images.length}</p>
      </div>
      <ul className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-6 lg:grid-cols-10">
        {images.map((image) => (
          <li key={image.url} className="relative aspect-square overflow-hidden rounded-full bg-mist ring-1 ring-line">
            <Image src={image.url} alt={loc(image.alt, locale)} fill className="object-cover object-top" sizes="120px" />
          </li>
        ))}
      </ul>
    </section>
  );
}
