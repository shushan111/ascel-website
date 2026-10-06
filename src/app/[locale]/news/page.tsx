import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles } from "@/data/news";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { CalendarIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/FadeIn";
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

/** The latest story leads wide; the rest follow in an even grid. */
export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsPage");
  const common = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const [lead, ...rest] = await getNewsArticles();

  return (
    <>
      <PageHeader breadcrumbs={[{ label: nav("news") }]} title={t("title")} intro={t("intro")} />

      <Section space="none" className="pb-16 md:pb-band">
        <Container width="wide">
          {lead ? (
            <>
              <NewsCard article={lead} locale={locale} variant="lead" />
              {rest.length ? (
                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-6">
                  {rest.map((article, index) => (
                    <li key={article.id}>
                      <FadeIn delay={(index % 3) * 0.06} className="h-full">
                        <NewsCard article={article} locale={locale} />
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <EmptyState
              icon={<CalendarIcon className="h-5 w-5" />}
              title={common("emptyNewsTitle")}
              body={common("emptyNewsBody")}
            />
          )}
        </Container>
      </Section>
    </>
  );
}
