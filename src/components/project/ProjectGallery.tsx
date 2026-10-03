import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectGallery, projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * The renderings from the sketch design, credited as visualisations, each at
 * its own proportions rather than cropped to a common ratio.
 */
export async function ProjectGallery({
  locale,
  exclude = [],
}: {
  locale: string;
  /** Renderings already shown elsewhere on the page. */
  exclude?: string[];
}) {
  const t = await getTranslations("ProjectGallery");
  const items = projectGallery.filter((item) => !exclude.includes(item.src));
  if (!items.length) return null;

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <h3 className="t-h2 text-ink">{t("title")}</h3>
        <p className="t-small max-w-md text-muted">{t("subtitle")}</p>
      </div>
      <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
        {items.map((item) => (
          <figure key={item.src}>
            <ImageReveal>
              <Image
                src={item.src}
                alt={loc(item.alt, locale)}
                width={item.width}
                height={item.height}
                className="h-auto w-full bg-mist"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </ImageReveal>
            <figcaption className="t-small mt-3 text-muted">{loc(item.alt, locale)}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-[0.85rem] leading-6 text-muted">
        {t("credit", {
          architects: loc(projectMeta.architects, locale),
          stage: loc(projectMeta.stage, locale),
        })}
      </p>
    </div>
  );
}
