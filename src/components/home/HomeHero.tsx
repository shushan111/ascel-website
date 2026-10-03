import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { workPhotos } from "@/data/work";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { getPhotoCaption } from "@/lib/courseIndex";

/**
 * The first screen is the organisation at work: a real course, real doctors,
 * real instruments. The building comes later in the page, once the visitor
 * knows who is asking. Support is offered, but as the second action.
 *
 * DRAFT — պատվիրատուի հաստատման կարիք ունի (Home.heroHeadline,
 * Home.heroSupporting). Every claim in them is already on the site.
 */
export async function HomeHero({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const photo = workPhotos.heroHandsOn;
  const caption = await getPhotoCaption(photo.course, locale);

  return (
    <section className="relative isolate flex min-h-[36rem] items-end overflow-hidden bg-night md:min-h-[44rem] lg:min-h-[calc(100svh-5.25rem)] lg:max-h-[60rem]">
      <Image
        src={photo.src}
        alt={caption ?? ""}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[60%_center]"
      />
      {/* Legibility, not decoration: dark where the text sits (bottom-left),
          clear where the people are. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-night/45 to-night/10 lg:bg-linear-to-tr lg:from-night/88 lg:via-night/35 lg:to-transparent"
      />

      <Container width="wide" className="pb-12 pt-32 md:pb-16 lg:pb-20">
        <div className="max-w-[46rem]">
          <p className="t-eyebrow text-on-dark/80">{t("heroEyebrow")}</p>
          <h1 className="t-hero mt-6 text-balance text-on-dark">
            {t("heroHeadline")}
          </h1>
          <p className="t-lead mt-7 max-w-[34rem] text-on-dark/80">
            {t("heroSupporting")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#work" className={buttonClassName("onDark")}>
              {t("heroCtaWork")}
            </Link>
            <Link href="/donate" className={buttonClassName("outlineDark")}>
              {t("heroCtaSupport")}
            </Link>
          </div>
        </div>
        {caption ? (
          <p className="mt-12 text-[0.8rem] leading-5 text-on-dark/55 lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:max-w-xs lg:text-right">
            {caption}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
