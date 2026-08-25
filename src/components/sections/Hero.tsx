import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-navy-deep">
      <Image
        src="/images/hero-simulation.jpg"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-navy-deep/90 via-navy/75 to-navy/35" />
      <Container className="relative flex min-h-[88vh] items-end pb-20 pt-32 md:items-center md:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
            {t("supporting")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/programs" className={buttonClassName("donate")}>
              {t("primaryCta")}
            </Link>
            <Link
              href="/donate"
              className={buttonClassName(
                "secondary",
                "border-white/35 text-white hover:border-white hover:bg-white/10",
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
