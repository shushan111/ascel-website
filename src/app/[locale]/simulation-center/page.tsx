import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { projectLevels, projectMeta } from "@/data/project";
import { workPhotos } from "@/data/work";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Chapter } from "@/components/ui/Chapter";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProjectFigures } from "@/components/project/ProjectFigures";
import { MonumentSection } from "@/components/project/MonumentSection";
import { ProjectSteps } from "@/components/project/ProjectSteps";
import { ProjectLevels } from "@/components/project/ProjectLevels";
import { CadaverLab } from "@/components/project/CadaverLab";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ImpactChain } from "@/components/impact/ImpactChain";
import { Reasons } from "@/components/impact/Reasons";
import { getPhotoCaption } from "@/lib/courseIndex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("simulationTitle"),
    description: t("simulationDescription"),
    path: "/simulation-center",
    locale,
    image: "/images/project/facade-after.webp",
  });
}

/**
 * The project in three chapters: the building as it is, the design for it,
 * and — so the page never ends as an architecture portfolio — what will
 * happen inside and why that matters for medical education. One support
 * action at the close, not after every section.
 */
export default async function MedicalTrainingCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CenterPage");
  const hero = await getTranslations("ProjectHero");
  const intro = await getTranslations("ProjectIntro");
  const programs = await getTranslations("ProgramsHome");

  const facts = [
    { label: t("factAddress"), value: loc(projectMeta.addressLine, locale) },
    { label: t("factPlot"), value: projectMeta.landPlot },
    { label: t("factStage"), value: loc(projectMeta.stage, locale) },
    { label: t("factArchitects"), value: loc(projectMeta.architects, locale) },
  ];

  const levelImages = projectLevels.map((level) => level.image);
  const [handsOnCaption, hallCaption] = await Promise.all([
    getPhotoCaption(workPhotos.kneeHandsOn.course, locale),
    getPhotoCaption(workPhotos.boneLecture.course, locale),
  ]);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      {/* The vision first, at full width: the reason to read the rest. */}
      <figure className="mx-auto max-w-[100rem] md:px-8">
        <div className="relative aspect-[4/3] bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
          <Image
            src="/images/project/facade-after.webp"
            alt={t("imageAlt")}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <figcaption className="t-small mt-4 px-5 text-muted sm:px-6 md:px-0">
          {hero("credit", { architects: loc(projectMeta.architects, locale) })}
        </figcaption>
      </figure>

      <section className="bg-canvas pb-6 pt-16 md:pt-20">
        <Container width="wide">
          <ProjectFigures locale={locale} />
          <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.85rem] text-muted">{fact.label}</dt>
                <dd className="mt-1.5 text-[1rem] leading-6 text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <MonumentSection locale={locale} />

      {/* Chapter two: the design. */}
      <section className="bg-paper py-20 md:py-band">
        <Container width="wide">
          <Chapter no="02" label={t("chapterVision")} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-6">
              <h2 className="t-h1 text-balance text-ink">{intro("title")}</h2>
            </FadeIn>
            <FadeIn className="lg:col-span-5 lg:col-start-8">
              <p className="t-body text-body">{intro("body")}</p>
              <p className="t-body mt-5 text-muted">{intro("bodySecond")}</p>
            </FadeIn>
          </div>
        </Container>

        <figure className="mx-auto mt-14 max-w-[100rem] md:mt-20 md:px-8">
          <ImageReveal>
            <div className="relative aspect-[4/3] bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
              <Image
                src="/images/project/aerial-after.webp"
                alt={intro("imageAlt")}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </ImageReveal>
          <figcaption className="t-small mt-4 px-5 text-muted sm:px-6 md:px-0">
            {intro("imageAlt")}
          </figcaption>
        </figure>

        <Container width="wide" className="mt-20 md:mt-28">
          <ProjectSteps locale={locale} />
        </Container>
        <div className="mt-20 md:mt-28">
          <ProjectLevels locale={locale} />
        </div>
        <Container width="wide" className="mt-20 md:mt-28">
          <ProjectGallery
            locale={locale}
            exclude={["/images/project/aerial-after.webp", ...levelImages]}
          />
        </Container>
      </section>

      {/* Chapter three: what the building is for. */}
      <section className="bg-canvas py-20 md:py-band">
        <Container width="wide">
          <Chapter no="03" label={t("chapterInside")} />
          <div className="mt-12 md:mt-16">
            <CadaverLab />
          </div>

          <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <h2 className="t-h1 text-balance text-ink">{t("impactTitle")}</h2>
              <p className="t-lead mt-6 text-muted">{t("impactBody")}</p>
              <ArrowLink href="/courses" className="mt-6">
                {t("seeCourses")}
              </ArrowLink>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {[
                { photo: workPhotos.kneeHandsOn, caption: handsOnCaption },
                { photo: workPhotos.boneLecture, caption: hallCaption },
              ].map(({ photo, caption }) => (
                <figure key={photo.src}>
                  <ImageReveal>
                    <div className="relative aspect-[4/5] bg-mist">
                      <Image
                        src={photo.src}
                        alt={caption ?? ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  </ImageReveal>
                  {caption ? (
                    <figcaption className="mt-3 text-[0.82rem] leading-5 text-muted">{caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>

          <ImpactChain surface="canvas" className="mt-20 md:mt-28" />
          <Reasons locale={locale} className="mt-20 border-t border-line pt-14" />
        </Container>
      </section>

      {/* One close, one ask. Light, not another dark band. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide" className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <p className="t-h3 max-w-2xl text-balance text-ink lg:col-span-7">{t("closing")}</p>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <Link href="/donate" className={buttonClassName("support")}>
              {t("donateCta")}
            </Link>
            <Link href="/programs" className={buttonClassName("secondary")}>
              {programs("title")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
