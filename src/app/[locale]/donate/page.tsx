import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { getIntroMetrics } from "@/data/metrics";
import { workPhotos } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { DonationCategories } from "@/components/donate/DonationCategories";
import { HowToGive } from "@/components/donate/HowToGive";
import { FundraisingProgress } from "@/components/donate/FundraisingProgress";
import { TrustPanel } from "@/components/donate/TrustPanel";
import { ImpactChain } from "@/components/impact/ImpactChain";

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
 * The "how" sits beside the opening so nobody has to scroll to find it.
 * Progress, payment details and the legal panel are wired to data that is
 * still null; each appears on its own once the client supplies it.
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
      <section className="bg-canvas pb-16 pt-14 md:pb-24 md:pt-24">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="t-eyebrow text-muted">{t("eyebrow")}</p>
            <h1 className="t-display mt-5 text-balance text-ink">{t("title")}</h1>
            <p className="t-lead mt-7 max-w-[36rem] text-muted">{t("intro")}</p>
            <FundraisingProgress locale={locale} />
          </div>
          {/* On a phone the way to give follows the intro directly; on
              desktop it holds its column beside the text and the image. */}
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-28">
              <HowToGive />
            </div>
          </div>
          <figure className="lg:col-span-6 lg:row-start-2">
            <div className="relative aspect-[16/9] bg-mist">
              <Image
                src="/images/project/facade-after.webp"
                alt={center("imageAlt")}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </div>
          </figure>
        </Container>
      </section>

      {/* What exactly the support builds. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide">
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-10">
            <h2 className="t-h2 text-ink">{donateHome("categoriesTitle")}</h2>
            <p className="t-small max-w-md text-muted">{donateHome("bodySecond")}</p>
          </div>
          <div className="mt-10">
            <DonationCategories options={options} locale={locale} showTitle={false} />
          </div>
          <ArrowLink href="/simulation-center" className="mt-8">
            {donateHome("supportPrograms")}
          </ArrowLink>
        </Container>
      </section>

      {/* Why it matters. */}
      <section className="bg-canvas py-20 md:py-28">
        <Container width="wide">
          <h2 className="t-h2 max-w-xl text-balance text-ink">{home("mattersTitle")}</h2>
          <ImpactChain surface="canvas" className="mt-12 md:mt-16" />
        </Container>
      </section>

      {/* Who is behind it: the track record, briefly, with the way to read more. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="t-h2 text-balance text-ink">{t("whoTitle")}</h2>
            <p className="t-body mt-6 text-body">{home("heroSupporting")}</p>
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex flex-col-reverse">
                  <dt className="t-small mt-2 text-muted">{loc(metric.label, locale)}</dt>
                  <dd className="font-display text-[2.6rem] font-normal leading-none text-ink">{metric.display}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
              <ArrowLink href="/about">{nav("about")}</ArrowLink>
              <ArrowLink href="/programs">{nav("programs")}</ArrowLink>
              <ArrowLink href="/courses">{nav("courses")}</ArrowLink>
            </div>
          </div>
          <div className="relative aspect-[3/2] bg-mist lg:col-span-5 lg:col-start-8">
            <Image
              src={workPhotos.exfixTeam.src}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <TrustPanel locale={locale} className="lg:col-span-12" />
        </Container>
      </section>
    </>
  );
}
