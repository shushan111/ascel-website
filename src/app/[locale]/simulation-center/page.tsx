import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ProjectFigures } from "@/components/project/ProjectFigures";
import { MonumentSection } from "@/components/project/MonumentSection";
import { ProjectSteps } from "@/components/project/ProjectSteps";
import { ProjectLevels } from "@/components/project/ProjectLevels";
import { CadaverLab } from "@/components/project/CadaverLab";
import { ProjectGallery } from "@/components/project/ProjectGallery";

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
 * The project in full. The route is unchanged so existing links keep
 * working; everything the visitor reads now names the Medical Training
 * Center.
 */
export default async function MedicalTrainingCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CenterPage");

  const facts = [
    { label: t("factAddress"), value: loc(projectMeta.addressLine, locale) },
    { label: t("factPlot"), value: projectMeta.landPlot },
    { label: t("factStage"), value: loc(projectMeta.stage, locale) },
    {
      label: t("factArchitects"),
      value: loc(projectMeta.architects, locale),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        aside={
          <Link href="/donate" className={buttonClassName("primary")}>
            {t("donateCta")}
          </Link>
        }
      />

      <Container className="mt-10 md:mt-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
          <Image
            src="/images/project/facade-after.webp"
            alt={t("imageAlt")}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1136px, 100vw"
          />
        </div>
      </Container>

      <Section>
        <Container>
          <ProjectFigures locale={locale} />
          <dl className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-4">
                <dt className="t-meta-sm text-muted">{fact.label}</dt>
                <dd className="mt-2 text-sm leading-6 text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <MonumentSection locale={locale} />
      <ProjectSteps locale={locale} />
      <ProjectLevels locale={locale} />
      <CadaverLab />
      <ProjectGallery locale={locale} />

      <Section tone="paper" space="compact">
        <Container>
          <p className="t-body max-w-2xl text-body">{t("closing")}</p>
          <Link href="/donate" className={buttonClassName("primary", "mt-8")}>
            {t("donateCta")}
          </Link>
        </Container>
      </Section>
    </>
  );
}
