import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FoundersSection } from "@/components/sections/FoundersSection";

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
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {/* Sticky on desktop so the portrait stays with the reader through
                nine consecutive text sections. */}
            <div className="lg:sticky lg:top-28">
              <ImageReveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-mist">
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
          </div>
          <div className="lg:col-span-7">
            {sections.map(([titleKey, bodyKey]) => (
              <FadeIn
                key={titleKey}
                className="border-t border-line pt-8 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-10"
              >
                <h2 className="t-h3 text-balance text-ink">{t(titleKey)}</h2>
                <p className="t-body mt-4 text-muted">{t(bodyKey)}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="paper">
        <Container width="text">
          <h2 className="t-h2 text-balance text-ink">{t("timelineTitle")}</h2>
          <ol className="mt-10 border-l border-line-strong">
            <li className="relative pl-8 pb-2">
              <span className="absolute -left-[4.5px] top-2 h-2 w-2 rounded-full bg-accent" />
              <p className="t-meta-sm text-accent">{t("timelineItem1Date")}</p>
              <h3 className="t-h4 mt-3 text-ink">{t("timelineItem1Title")}</h3>
              <p className="t-small mt-3 text-muted">{t("timelineItem1Body")}</p>
            </li>
          </ol>
        </Container>
      </Section>
      <FoundersSection locale={locale} />
    </>
  );
}
