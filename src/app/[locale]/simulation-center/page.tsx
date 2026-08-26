import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
      <section className="relative min-h-[48vh] overflow-hidden bg-navy">
        <Image
          src="/images/simulation-center.webp"
          alt={home("imageAlt")}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <Container className="relative flex min-h-[48vh] flex-col justify-end py-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {t("title")}
          </h1>
        </Container>
      </section>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-7 text-muted">{t("intro")}</p>
            <h2 className="mt-10 text-2xl font-semibold tracking-tight text-navy">
              {t("areasTitle")}
            </h2>
            <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2">
              {areaKeys.map((key) => (
                <li key={key} className="bg-white px-4 py-4 text-sm text-navy">
                  {home(key)}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 text-muted">{t("note")}</p>
          </div>
          <div className="grid gap-4">
            <ImageReveal>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/capability-simulation.webp"
                  alt={home("medicalSimulation")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </ImageReveal>
            <ImageReveal>
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/capability-team.webp"
                  alt={home("teamTraining")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </ImageReveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
