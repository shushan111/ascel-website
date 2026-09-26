import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProjectFigures } from "@/components/project/ProjectFigures";

/** What the project is, in one panel, above the detail. */
export async function ProjectIntro({ locale }: { locale: string }) {
  const t = await getTranslations("ProjectIntro");

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="t-eyebrow mb-4 text-accent">{t("eyebrow")}</p>
            <h2 className="t-h2 text-balance text-ink">{t("title")}</h2>
            <p className="t-body mt-6 max-w-xl text-muted">{t("body")}</p>
            <p className="t-body mt-5 max-w-xl text-muted">{t("bodySecond")}</p>
          </FadeIn>
          <ImageReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist">
              <Image
                src="/images/project/aerial-after.webp"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </ImageReveal>
        </div>
        <div className="mt-16 md:mt-20">
          <ProjectFigures locale={locale} />
          <p className="mt-5 text-xs leading-5 text-muted">{t("figuresNote")}</p>
        </div>
      </Container>
    </Section>
  );
}
