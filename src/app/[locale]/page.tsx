import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ActivePrograms } from "@/components/sections/ActivePrograms";
import { SimulationPreview } from "@/components/sections/SimulationPreview";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { SupportSection } from "@/components/sections/SupportSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ImpactSection } from "@/components/sections/ImpactSection";

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
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro locale={locale} />
      <ActivePrograms locale={locale} />
      <SimulationPreview />
      <CoursesPreview locale={locale} />
      <UpcomingEvents locale={locale} />
      <NewsPreview locale={locale} />
      <SupportSection locale={locale} />
      <PartnersSection />
      <ImpactSection locale={locale} />
    </>
  );
}
