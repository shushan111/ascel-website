import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    path: "/about",
    locale,
    image: "/images/about-intro.webp",
  });
}

const sections = [
  ["whoTitle", "whoBody"],
  ["missionTitle", "missionBody"],
  ["visionTitle", "visionBody"],
  ["whatTitle", "whatBody"],
  ["simulationTitle", "simulationBody"],
  ["experimentalTitle", "experimentalBody"],
  ["developmentTitle", "developmentBody"],
  ["collaborationTitle", "collaborationBody"],
  ["approachTitle", "approachBody"],
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  return (
    <>
      <section className="bg-navy py-20 md:py-28">
        <Container className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {t("title")}
          </h1>
        </Container>
      </section>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ImageReveal>
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/about-intro.webp"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </ImageReveal>
          </div>
          <div className="space-y-12 lg:col-span-7">
            {sections.map(([titleKey, bodyKey]) => (
              <FadeIn key={titleKey}>
                <h2 className="text-2xl font-semibold tracking-tight text-navy">
                  {t(titleKey)}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">{t(bodyKey)}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="canvas">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-navy">
            {t("timelineTitle")}
          </h2>
          <ol className="mt-8 border-l border-line">
            <li className="relative pl-8 pb-2">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-xs uppercase tracking-[0.18em] text-accent">
                {t("timelineItem1Date")}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-navy">
                {t("timelineItem1Title")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{t("timelineItem1Body")}</p>
            </li>
          </ol>
        </Container>
      </Section>
    </>
  );
}
