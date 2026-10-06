import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
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
 * who we are and the proof (hero with its figures) → what we do (the
 * programmes) → what has been done (photographs, the next course, the
 * archive) → what that work has led to (the building) → why it matters → what
 * a gift builds → proof the organisation is alive (news) → partners. The
 * shared footer band closes with the ask. Each subject appears once.
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
