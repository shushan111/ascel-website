import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { projectLevels, projectMeta } from "@/data/project";
import { workPhotos } from "@/data/work";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHeader } from "@/components/ui/PageHeader";
import { WideFigure } from "@/components/ui/WideFigure";
import { FactList } from "@/components/ui/FactList";
import { SectionNav } from "@/components/ui/SectionNav";
import { Chapter } from "@/components/ui/Chapter";
import { ArrowLink } from "@/components/ui/ArrowLink";
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
 * happen inside and why that matters for medical education. A sticky bar
 * moves between the chapters; the shared footer band closes with the ask.
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
  const nav = await getTranslations("Nav");
  const home = await getTranslations("Home");

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

  const chapters = [
    { id: "now", label: `01 · ${t("chapterNow")}` },
    { id: "vision", label: `02 · ${t("chapterVision")}` },
    { id: "inside", label: `03 · ${t("chapterInside")}` },
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: nav("simulationShort") }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        aside={<FactList facts={facts} />}
      />

      {/* The vision first, at full width: the reason to read the rest. */}
      <WideFigure
        src="/images/project/facade-after.webp"
        alt={t("imageAlt")}
        caption={hero("credit", { architects: loc(projectMeta.architects, locale) })}
        priority
      />

      <Section space="none" className="pb-12 pt-10 md:pb-16 md:pt-14">
        <Container width="wide">
          <ProjectFigures locale={locale} />
        </Container>
      </Section>

      <SectionNav items={chapters} />

      <MonumentSection locale={locale} />

      {/* Chapter two: the design. */}
      <Section id="vision" tone="paper">
        <Container width="wide">
          <Chapter no="02" label={t("chapterVision")} />
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-6">
              <h2 className="t-h1 text-balance text-ink">{intro("title")}</h2>
            </FadeIn>
            <FadeIn className="lg:col-span-5 lg:col-start-8">
              <p className="t-body text-body">{intro("body")}</p>
              <p className="t-body mt-4 text-muted">{intro("bodySecond")}</p>
            </FadeIn>
          </div>
        </Container>

        <WideFigure
          src="/images/project/aerial-after.webp"
          alt={intro("imageAlt")}
          caption={intro("imageAlt")}
          reveal
          className="mt-12 md:mt-16"
        />

        <Container width="wide" className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          <ProjectSteps locale={locale} />
          <ProjectLevels locale={locale} />
          <ProjectGallery locale={locale} exclude={["/images/project/aerial-after.webp", ...levelImages]} />
        </Container>
      </Section>

      {/* Chapter three: what the building is for. */}
      <Section id="inside">
        <Container width="wide">
          <Chapter no="03" label={t("chapterInside")} />
          <div className="mt-10 md:mt-14">
            <CadaverLab />
          </div>

          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-center lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <h2 className="t-h1 text-balance text-ink">{t("impactTitle")}</h2>
              <p className="t-lead mt-5 text-muted">{t("impactBody")}</p>
              <ArrowLink href="/courses" className="mt-5">
                {t("seeCourses")}
              </ArrowLink>
            </FadeIn>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:gap-4">
              {[
                { photo: workPhotos.kneeHandsOn, caption: handsOnCaption },
                { photo: workPhotos.boneLecture, caption: hallCaption },
              ].map(({ photo, caption }) => (
                <figure key={photo.src}>
                  <ImageReveal className="media">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={photo.src}
                        alt={caption ?? ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  </ImageReveal>
                  {caption ? <figcaption className="t-caption mt-2.5 text-muted">{caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-20 md:mt-28">
            <SectionHeader eyebrow={home("mattersEyebrow")} title={home("mattersTitle")} />
            <ImpactChain className="mt-10 md:mt-12" />
            <Reasons locale={locale} className="mt-12 md:mt-16" />
          </div>
        </Container>
      </Section>
    </>
  );
}
