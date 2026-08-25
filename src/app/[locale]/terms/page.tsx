import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("termsTitle"),
    description: t("termsTitle"),
    path: "/terms",
    locale,
    noIndex: true,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">{t("termsTitle")}</h1>
        <p className="mt-6 text-base leading-7 text-muted">{t("termsBody")}</p>
      </Container>
    </Section>
  );
}
