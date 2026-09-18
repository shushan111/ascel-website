import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImageReveal } from "@/components/motion/ImageReveal";

const areaKeys = [
  "medicalSimulation",
  "surgicalTraining",
  "emergencyScenarios",
  "teamTraining",
  "proceduralSkills",
  "experimentalLearning",
] as const;

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
    image: "/images/simulation-center.webp",
  });
}

export default async function SimulationCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SimulationPage");
  const home = await getTranslations("SimulationHome");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Container className="mt-10 md:mt-14">
        <div className="relative aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9] overflow-hidden rounded-md bg-mist">
          <Image
            src="/images/simulation-center.webp"
            alt={home("imageAlt")}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1136px, 100vw"
          />
        </div>
      </Container>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="t-h2 text-balance text-ink">{t("areasTitle")}</h2>
            <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {areaKeys.map((key) => (
                <li
                  key={key}
                  className="border-t border-line py-4 text-sm leading-6 text-ink"
                >
                  {home(key)}
                </li>
              ))}
            </ul>
            <p className="t-small mt-10 border-l-2 border-accent pl-5 text-muted">
              {t("note")}
            </p>
          </div>
          <div className="grid gap-6 lg:col-span-5">
            <ImageReveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist">
                <Image
                  src="/images/capability-simulation.webp"
                  alt={home("medicalSimulation")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </ImageReveal>
            <ImageReveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-mist">
                <Image
                  src="/images/capability-team.webp"
                  alt={home("teamTraining")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </ImageReveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
