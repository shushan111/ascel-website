import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles } from "@/data/news";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
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
    image: "/images/work/exfix2022-team.webp",
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
  const [lead, ...rest] = await getNewsArticles();

  return (
    <>
      {/* DRAFT — պատվիրատուի հաստատման կարիք ունի (intro) */}
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      {lead ? (
        <section className="bg-canvas pb-16 md:pb-24">
          <Container width="wide">
            <NewsCard article={lead} locale={locale} variant="lead" />
          </Container>
        </section>
      ) : null}
      {rest.length ? (
        <section className="bg-paper py-16 md:py-24">
          <Container width="wide">
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-16">
              {rest.map((article) => (
                <NewsCard key={article.id} article={article} locale={locale} variant="feature" />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
