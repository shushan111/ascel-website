import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectFigures, projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * The turn of the page: only after the work has been shown does the building
 * appear, introduced as what the work has led to. Kept to one transition, one
 * comparison and one pair — the full story lives on the center page.
 */
export async function NextStep({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const hero = await getTranslations("ProjectHero");
  const monument = await getTranslations("Monument");
  const intro = await getTranslations("ProjectIntro");
  const unit = locale === "hy" ? "քմ" : "m²";
  const figures = projectFigures.slice(0, 3);

  return (
    <>
      {/* The transition line, on its own, with room around it. */}
      <section className="bg-night py-24 text-on-dark md:py-36">
        <Container width="wide">
          <FadeIn className="max-w-4xl">
            <p className="t-eyebrow text-accent-light">{t("buildingEyebrow")}</p>
            <p className="t-display mt-8 text-balance text-on-dark">{t("nextLine")}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-canvas pb-24 pt-20 md:pb-band md:pt-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-6">
              <p className="t-small text-muted">{loc(projectMeta.addressLine, locale)}</p>
              <h2 className="t-h1 mt-4 text-balance text-ink">{hero("headline")}</h2>
            </FadeIn>
            <FadeIn className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <p className="t-body text-body">{hero("supporting")}</p>
            </FadeIn>
          </div>
        </Container>

        <Container width="wide" className="mt-14 md:mt-20">
          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            {[
              { src: "/images/project/facade-before.webp", label: monument("captionBefore"), alt: monument("altBefore") },
              { src: "/images/project/facade-after.webp", label: monument("captionAfter"), alt: monument("altAfter") },
            ].map((image) => (
              <figure key={image.src}>
                <ImageReveal>
                  <div className="relative aspect-[3/2] bg-mist">
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                </ImageReveal>
                <figcaption className="t-small mt-4 max-w-md text-muted">{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </Container>

        <figure className="mx-auto mt-16 max-w-[100rem] md:mt-24 md:px-8">
          <ImageReveal>
            <div className="relative aspect-[4/3] bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
              <Image
                src="/images/project/aerial-after.webp"
                alt={intro("imageAlt")}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </ImageReveal>
          <figcaption className="t-small mt-4 px-5 text-muted sm:px-6 md:px-0">
            {intro("imageAlt")}
          </figcaption>
        </figure>

        <Container width="wide">

          <div className="mt-16 grid gap-10 border-t border-line pt-10 md:mt-20 lg:grid-cols-12 lg:items-end">
            <dl className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:col-span-8">
              {figures.map((figure) => (
                <div key={figure.id} className="flex flex-col-reverse">
                  <dt className="t-small mt-3 text-muted">{loc(figure.label, locale)}</dt>
                  <dd className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-normal leading-none tracking-[-0.02em] text-ink">
                    {figure.value}
                    <span className="ml-1 text-[0.5em] text-muted">{figure.unit ? unit : null}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="lg:col-span-4 lg:text-right">
              <Link href="/simulation-center" className={buttonClassName("secondary")}>
                {hero("secondaryCta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
