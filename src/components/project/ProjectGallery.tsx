import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectGallery, projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * The renderings from the sketch design, credited as such.
 *
 * Masonry columns rather than a fixed grid: the set mixes 16:9 exteriors
 * with tall courtyard views, and cropping them to one ratio was cutting the
 * subject out of half of them.
 */
export async function ProjectGallery({ locale }: { locale: string }) {
  const t = await getTranslations("ProjectGallery");

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {projectGallery.map((item) => (
            <ImageReveal key={item.src} className="mb-5 break-inside-avoid">
              <div className="overflow-hidden rounded-md bg-mist">
                <Image
                  src={item.src}
                  alt={loc(item.alt, locale)}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            </ImageReveal>
          ))}
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">
          {t("credit", {
            architects: loc(projectMeta.architects, locale),
            stage: loc(projectMeta.stage, locale),
          })}
        </p>
      </Container>
    </Section>
  );
}
