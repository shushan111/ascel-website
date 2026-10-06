import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { workPhotos } from "@/data/work";
import { getIntroMetrics } from "@/data/metrics";
import { loc } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getPhotoCaption } from "@/lib/courseIndex";

/**
 * The first screen is the organisation at work: a real course, real doctors,
 * real instruments. The proof — what the work adds up to — rides on a panel
 * across the hero's lower edge, so the claim and its evidence are read
 * together instead of a screen apart.
 */
export async function HomeHero({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const common = await getTranslations("Common");
  const photo = workPhotos.heroHandsOn;
  const caption = await getPhotoCaption(photo.course, locale);
  const metrics = getIntroMetrics();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night">
        <Image
          src={photo.src}
          alt={caption ?? ""}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[60%_center]"
        />
        {/* Legibility, not decoration: dark where the text sits, clear where
            the people are. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-night/92 via-night/55 to-night/15 lg:bg-linear-to-r lg:from-night/90 lg:via-night/50 lg:to-night/5"
        />

        <Container
          width="wide"
          className="flex min-h-[34rem] flex-col justify-end pb-28 pt-28 sm:min-h-[38rem] md:pb-36 lg:min-h-[min(calc(100svh-var(--header-h)),52rem)] lg:pb-40"
        >
          <div className="max-w-[44rem]">
            <p className="t-eyebrow text-on-dark/80">{t("heroEyebrow")}</p>
            <h1 className="t-hero mt-5 text-balance text-on-dark">{t("heroHeadline")}</h1>
            <p className="t-lead mt-6 max-w-[34rem] text-on-dark/80">{t("heroSupporting")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/#work" className={buttonClassName("onDark", undefined, "lg")}>
                {t("heroCtaWork")}
                <ArrowRightIcon className="btn-arrow" />
              </Link>
              <Link href="/donate" className={buttonClassName("outlineDark", undefined, "lg")}>
                {t("heroCtaSupport")}
              </Link>
            </div>
          </div>
          {caption ? (
            <p className="t-caption absolute right-5 top-5 hidden max-w-xs rounded-full bg-night/45 px-3 py-1.5 text-on-dark/75 backdrop-blur-sm md:block lg:right-8 lg:top-8">
              {caption}
            </p>
          ) : null}
        </Container>
      </section>

      {metrics.length ? (
        <section aria-labelledby="proof-title" className="relative z-10 bg-canvas pb-4">
          <Container width="wide">
            <div className="card -mt-16 grid gap-8 p-6 shadow-panel sm:p-8 md:-mt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-10">
              <div className="lg:col-span-4">
                <p className="t-eyebrow text-muted">{t("proofEyebrow")}</p>
                <h2 id="proof-title" className="t-h3 mt-3 max-w-xs text-balance text-ink">
                  {t("proofTitle")}
                </h2>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 lg:col-span-8">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex flex-col-reverse border-l border-line pl-4 sm:pl-5">
                    <dt className="t-small mt-2 text-muted">{loc(metric.label, locale)}</dt>
                    <dd className="t-figure-sm text-ink">{metric.display}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="t-caption mx-auto mt-4 max-w-4xl text-center text-muted lg:mt-5">
              {common("placeholderMetricsNote")}
            </p>
          </Container>
        </section>
      ) : null}
    </>
  );
}
