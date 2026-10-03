import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { GalleryImage } from "@/types";
import { loc } from "@/lib/utils";

/**
 * The course's faculty headshots, kept small and together. In the archive
 * these sit under the programme's "Faculty" heading; shown at gallery size
 * they read as a wall of faces and push the course photographs down.
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
      <h2 className="t-h3 text-ink">{t("faculty")}</h2>
      <ul className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-10">
        {images.map((image) => (
          <li key={image.url} className="relative aspect-square overflow-hidden bg-mist">
            <Image src={image.url} alt={loc(image.alt, locale)} fill className="object-cover object-top" sizes="120px" />
          </li>
        ))}
      </ul>
    </section>
  );
}
