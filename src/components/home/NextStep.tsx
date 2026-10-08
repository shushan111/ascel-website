import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectFigures, projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * The turn of the page: only after the work has been shown does the building
 * appear, introduced as what the work has led to. One comparison — the same
 * facade today and after — and the three figures that size it. The full story
 * lives on the project page.
 */
export async function NextStep({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const hero = await getTranslations("ProjectHero");
  const monument = await getTranslations("Monument");
  const unit = locale === "hy" ? "քմ" : "m²";
  const figures = projectFigures.slice(0, 3);

  const pair = [
    { src: "/images/project/facade-before.webp", badge: monument("nowLabel"), caption: monument("captionBefore"), alt: monument("altBefore") },
    { src: "/images/project/facade-after.webp", badge: monument("afterLabel"), caption: monument("captionAfter"), alt: monument("altAfter") },
  ];

  return (
    <Section tone="paper" id="building">
      <Container width="wide">
        <SectionHeader
          layout="split"
          eyebrow={t("buildingEyebrow")}
          title={hero("headline")}
          action={<p className="t-body font-semibold text-ink">{hero("supportingEmphasis")}</p>}
          size="h1"
        />

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-4 lg:gap-6">
          {pair.map((image, index) => (
            <figure key={image.src}>
              <ImageReveal className="media">
                <div className="relative aspect-[3/2]">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <Badge tone={index === 1 ? "accent" : "dark"} className="absolute left-3 top-3 sm:left-4 sm:top-4">
                  {image.badge}
                </Badge>
              </ImageReveal>
              <figcaption className="t-small mt-3 max-w-md text-muted">{image.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="card mt-8 grid gap-6 p-6 sm:p-8 md:mt-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-8">
            {figures.map((figure) => (
              <div key={figure.id} className="flex flex-col-reverse border-l border-line pl-4 sm:pl-5">
                <dt className="t-small mt-2 text-muted">{loc(figure.label, locale)}</dt>
                <dd className="t-figure-sm text-ink">
                  {figure.value}
                  {figure.unit ? <span className="ml-1 text-[0.5em] text-muted">{unit}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
            <p className="t-small flex items-center gap-2 text-muted">
              <MapPinIcon className="text-accent-ink" />
              {loc(projectMeta.addressLine, locale)}
            </p>
            <Link href="/simulation-center" className={buttonClassName("primary", "w-full sm:w-auto")}>
              {hero("secondaryCta")}
              <ArrowRightIcon className="btn-arrow" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
