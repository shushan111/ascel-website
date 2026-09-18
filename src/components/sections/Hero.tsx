import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    // Sized in rem with a viewport floor rather than a flat 88vh: the old
    // height pushed the first section fully below the fold on laptops.
    <section className="relative flex min-h-[32rem] items-end overflow-hidden bg-ink md:min-h-[38rem] md:items-center lg:min-h-[41rem]">
      <Image
        src="/images/hero-simulation.webp"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* A legibility scrim, not a decorative gradient. */}
      <div className="absolute inset-0 bg-ink/78" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/55 to-transparent" />
      <Container className="relative py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="t-eyebrow text-accent-light">{t("eyebrow")}</p>
          <h1 className="t-display mt-5 text-balance text-on-dark">
            {t("headline")}
          </h1>
          <p className="t-lead mt-6 max-w-xl text-on-dark/80">
            {t("supporting")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/programs" className={buttonClassName("onDark")}>
              {t("primaryCta")}
            </Link>
            <Link
              href="/donate"
              className={buttonClassName(
                "secondary",
                "border-on-dark/45 text-on-dark hover:border-on-dark hover:bg-on-dark/12 hover:text-on-dark",
              )}
            >
              {t("secondaryCta")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
