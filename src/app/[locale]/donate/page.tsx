import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { getIntroMetrics } from "@/data/metrics";
import { workPhotos } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { DonationCategories } from "@/components/donate/DonationCategories";
import { HowToGive } from "@/components/donate/HowToGive";
import { FundraisingProgress } from "@/components/donate/FundraisingProgress";
import { TrustPanel } from "@/components/donate/TrustPanel";
import { ImpactChain } from "@/components/impact/ImpactChain";
import { ImageReveal } from "@/components/motion/ImageReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("donateTitle"),
    description: t("donateDescription"),
    path: "/donate",
    locale,
    image: "/images/project/facade-after.webp",
  });
}

/**
 * The simplest page on the site, answering four questions in order:
 * what am I supporting, why does it matter, who is behind it, how do I give.
 * The "how" sits beside the opening — and stays there as the page scrolls on
 * desktop — so nobody has to look for it. Progress, payment details and the
 * legal panel are wired to data that is still null; each appears on its own
 * once the client supplies it.
 */
export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DonatePage");
  const home = await getTranslations("Home");
  const donateHome = await getTranslations("DonateHome");
  const nav = await getTranslations("Nav");
  const center = await getTranslations("CenterPage");
  const options = getDonationOptions();
  const metrics = getIntroMetrics().slice(0, 2);

  return (
    <>
      {/* What — and how, beside it. */}
      <section className="bg-canvas pb-14 pt-4 md:pb-band md:pt-6">
        <Container width="wide">
          <Breadcrumbs items={[{ label: nav("donate") }]} />
          <div className="mt-6 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <p className="t-eyebrow text-muted">{t("eyebrow")}</p>
              <h1 className="t-display mt-5 text-balance text-ink">{t("title")}</h1>
              <p className="t-lead mt-6 max-w-[36rem] text-muted">{t("intro")}</p>
              <FundraisingProgress locale={locale} />
              <figure className="mt-10 hidden lg:block">
                <div className="media relative aspect-[16/10]">
                  <Image
                    src="/images/project/facade-after.webp"
                    alt={center("imageAlt")}
                    fill
                    priority
                    className="object-cover"
                    sizes="48vw"
                  />
                </div>
              </figure>
            </div>
            {/* On a phone the way to give follows the intro directly; on
                desktop it holds its column beside the text and the image. */}
            <div className="min-w-0 lg:col-span-5 lg:col-start-8">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                <HowToGive />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What exactly the support builds. */}
      <Section tone="paper">
        <Container width="wide">
          <SectionHeader
            title={donateHome("categoriesTitle")}
            intro={donateHome("bodySecond")}
            action={<ArrowLink href="/simulation-center">{donateHome("supportPrograms")}</ArrowLink>}
          />
          <div className="mt-10 md:mt-12">
            <DonationCategories options={options} locale={locale} />
          </div>
        </Container>
      </Section>

      {/* Why it matters. */}
      <Section>
        <Container width="wide">
          <SectionHeader eyebrow={home("mattersEyebrow")} title={home("mattersTitle")} />
          <ImpactChain className="mt-10 md:mt-14" />
        </Container>
      </Section>

      {/* Who is behind it: the track record, briefly, with the way to read more. */}
      <Section tone="paper">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="t-h1 text-balance text-ink">{t("whoTitle")}</h2>
            <p className="t-body mt-5 text-body">{home("heroSupporting")}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex flex-col-reverse border-l border-line-strong pl-4">
                  <dt className="t-small mt-2 text-muted">{loc(metric.label, locale)}</dt>
                  <dd className="t-figure-sm text-ink">{metric.display}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-1">
              <ArrowLink href="/about">{nav("about")}</ArrowLink>
              <ArrowLink href="/programs">{nav("programs")}</ArrowLink>
              <ArrowLink href="/courses">{nav("courses")}</ArrowLink>
            </div>
          </div>
          <ImageReveal className="media lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[3/2]">
              <Image src={workPhotos.exfixTeam.src} alt="" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </ImageReveal>
          <TrustPanel locale={locale} className="lg:col-span-12" />
        </Container>
      </Section>
    </>
  );
}
