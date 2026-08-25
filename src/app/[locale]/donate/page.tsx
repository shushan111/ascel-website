import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DonateButtons } from "@/components/donate/DonateButtons";
import { DonationCategories } from "@/components/donate/DonationCategories";
import { buttonClassName } from "@/components/ui/buttonStyles";

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
    image: "/images/donate-support.jpg",
  });
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DonatePage");
  const home = await getTranslations("DonateHome");
  const options = getDonationOptions();

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 md:py-28">
        <Image
          src="/images/donate-support.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <Container className="relative max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-7 text-white/75">{t("intro")}</p>
          <div className="mt-8">
            <DonateButtons invert />
          </div>
        </Container>
      </section>
      <Section tone="navy">
        <Container>
          <DonationCategories options={options} locale={locale} />
          <p className="mt-10 max-w-2xl text-sm leading-6 text-white/70">{t("trust")}</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
            {home("providerPending")}
          </p>
          <Link href="/contact" className={buttonClassName("secondary", "mt-8 border-white/30 text-white hover:bg-white/10 hover:border-white")}>
            {t("contactCta")}
          </Link>
        </Container>
      </Section>
    </>
  );
}
