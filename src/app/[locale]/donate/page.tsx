import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
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
    image: "/images/donate-support.webp",
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
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        aside={<DonateButtons />}
      />
      <Section tone="paper">
        <Container>
          <DonationCategories options={options} locale={locale} />
          <div className="mt-16 border-t border-line-strong pt-10">
            <p className="t-body max-w-2xl text-body">{t("trust")}</p>
            <p className="t-small mt-4 max-w-2xl text-muted">
              {home("providerPending")}
            </p>
            <Link
              href="/contact"
              className={buttonClassName("secondary", "mt-8")}
            >
              {t("contactCta")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
