import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles } from "@/data/news";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsCard } from "@/components/news/NewsCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("newsTitle"),
    description: t("newsDescription"),
    path: "/news",
    locale,
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsPage");
  const articles = await getNewsArticles();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section>
        <Container>
          {/* Two columns at most, matching the reference index: at a 1200px
              cap that gives roughly 570px per item, enough for the title to
              carry the row. */}
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 md:gap-y-16">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                locale={locale}
                variant="feature"
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
