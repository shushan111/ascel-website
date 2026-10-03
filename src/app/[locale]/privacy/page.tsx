import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";

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
    <Container width="text" className="pt-16 pb-24 md:pt-20 md:pb-32">
      <h1 className="t-h1 text-balance text-ink">{t("privacyTitle")}</h1>
      <Prose className="mt-8 border-t border-line pt-8">
        <p>{t("privacyBody")}</p>
      </Prose>
    </Container>
  );
}
