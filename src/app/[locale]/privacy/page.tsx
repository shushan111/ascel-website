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
    title: t("privacyTitle"),
    description: t("privacyTitle"),
    path: "/privacy",
    locale,
    noIndex: true,
  });
}

export default async function PrivacyPage({
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
        <h1 className="text-4xl font-semibold tracking-tight text-navy">{t("privacyTitle")}</h1>
        <p className="mt-6 text-base leading-7 text-muted">{t("privacyBody")}</p>
      </Container>
    </Section>
  );
}
