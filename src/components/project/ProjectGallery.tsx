import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectGallery, projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InfoIcon } from "@/components/ui/icons";
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
      <SectionHeader title={t("title")} intro={t("subtitle")} layout="split" as="h3" />
      <div className="mt-8 grid items-start gap-4 md:grid-cols-2 lg:gap-6">
        {items.map((item) => (
          <figure key={item.src}>
            <ImageReveal className="media">
              <Image
                src={item.src}
                alt={loc(item.alt, locale)}
                width={item.width}
                height={item.height}
                className="h-auto w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </ImageReveal>
            <figcaption className="t-caption mt-2.5 text-muted">{loc(item.alt, locale)}</figcaption>
          </figure>
        ))}
      </div>
      <p className="t-caption mt-6 flex gap-2 text-muted">
        <InfoIcon className="mt-0.5 h-3.5 w-3.5" />
        {t("credit", {
          architects: loc(projectMeta.architects, locale),
          stage: loc(projectMeta.stage, locale),
        })}
      </p>
    </div>
  );
}
