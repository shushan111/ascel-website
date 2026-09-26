import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectConditions } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * The monument, before and after. The photographs are the strongest argument
 * the project has, so they run at full width above the damage/repair pairs
 * rather than being decoration beside them.
 */
export async function MonumentSection({ locale }: { locale: string }) {
  const t = await getTranslations("Monument");

  const shots = [
    {
      src: "/images/project/facade-before.webp",
      caption: t("captionBefore"),
      alt: t("altBefore"),
    },
    {
      src: "/images/project/facade-after.webp",
      caption: t("captionAfter"),
      alt: t("altAfter"),
    },
  ];

  return (
    <Section tone="paper">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {shots.map((shot) => (
            <ImageReveal key={shot.src}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-mist">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="t-meta-sm mt-3 text-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            </ImageReveal>
          ))}
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {projectConditions.map((condition) => (
            <li
              key={condition.id}
              className="border-t border-line-strong pt-5"
            >
              <p className="t-small text-muted">
                <span className="t-meta-sm mr-2 text-ink">{t("nowLabel")}</span>
                {loc(condition.now, locale)}
              </p>
              <p className="t-small mt-3 border-l-2 border-accent pl-4 text-body">
                <span className="t-meta-sm mr-2 text-accent">
                  {t("afterLabel")}
                </span>
                {loc(condition.after, locale)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
