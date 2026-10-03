import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { ProofBand } from "@/components/home/ProofBand";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { OurWork } from "@/components/home/OurWork";
import { NextStep } from "@/components/home/NextStep";
import { WhyItMatters } from "@/components/home/WhyItMatters";
import { HomeSupport } from "@/components/home/HomeSupport";
import { Activity } from "@/components/home/Activity";
import { PartnersSection } from "@/components/sections/PartnersSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("homeTitle"),
    description: t("homeDescription"),
    path: "/",
    locale,
    image: "/images/work/exfix2022-hands-on.webp",
  });
}

/**
 * The home page is one story, in the order a donor needs it:
 * who we are and what we already do (hero, proof, programmes, the archive of
 * courses held) → what that work has led to (the building) → why the building
 * matters (building → training → professionals → care) → the ask → proof that
 * the organisation is alive (news, next course) → partners. Founders live on
 * the About page until real names and portraits replace the placeholders.
 * The building takes the middle of the page, not the top or most of it.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero locale={locale} />
      <ProofBand locale={locale} />
      <WhatWeDo locale={locale} />
      <OurWork locale={locale} />
      <NextStep locale={locale} />
      <WhyItMatters locale={locale} />
      <HomeSupport locale={locale} />
      <Activity locale={locale} />
      <PartnersSection />
    </>
  );
}
