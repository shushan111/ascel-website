import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { ProjectHero } from "@/components/project/ProjectHero";
import { WhyNow } from "@/components/sections/WhyNow";
import { Intro } from "@/components/sections/Intro";
import { SupportSection } from "@/components/sections/SupportSection";
import { ActivePrograms } from "@/components/sections/ActivePrograms";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { FoundersSection } from "@/components/sections/FoundersSection";

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
    image: "/images/project/facade-after.webp",
  });
}

/**
 * The home page makes the project's case in short: what is being built, and
 * then the ask. The detail — the monument's condition, the build sequence,
 * the room-by-room brief, the lab and the renderings — lives on the center
 * page, which the hero links to. Programs, courses and news follow
 * underneath as supporting evidence, not as the headline.
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
      <ProjectHero locale={locale} />
      {/* Why this matters comes before what the center is: a donor decides in
          the first screens, and the institutional introduction does not
          answer "why now". Full re-ordering lands in a later commit. */}
      <WhyNow locale={locale} />
      <Intro locale={locale} />
      <SupportSection locale={locale} />
      <ActivePrograms locale={locale} />
      <CoursesPreview locale={locale} />
      <UpcomingEvents locale={locale} />
      <NewsPreview locale={locale} />
      <FoundersSection locale={locale} />
      <PartnersSection />
    </>
  );
}
