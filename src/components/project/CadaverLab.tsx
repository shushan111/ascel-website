import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Why the basement exists. This is the part of the brief a visitor is least
 * likely to already understand, so it gets its own section rather than a
 * line in a room schedule.
 */
export async function CadaverLab() {
  const t = await getTranslations("CadaverLab");

  return (
    <Section tone="paper">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ImageReveal>
          <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-mist lg:aspect-[4/5]">
            <Image
              src="/images/project/new-volume.webp"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </ImageReveal>
        <FadeIn>
          <p className="t-eyebrow mb-4 text-accent">{t("eyebrow")}</p>
          <h2 className="t-h2 text-balance text-ink">{t("title")}</h2>
          <p className="t-body mt-6 text-muted">{t("body")}</p>
          <p className="t-body mt-5 text-muted">{t("bodySecond")}</p>
          <p className="t-small mt-8 border-l-2 border-line-strong pl-5 text-muted">
            {t("note")}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
