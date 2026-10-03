import { getTranslations } from "next-intl/server";
import { getLatestNews } from "@/data/news";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { NewsCard } from "@/components/news/NewsCard";

export async function NewsPreview({ locale }: { locale: string }) {
  const t = await getTranslations("NewsHome");
  const articles = await getLatestNews(3);

  return (
    <Section tone="paper">
      <Container>
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          action={<ArrowLink href="/news">{t("viewAll")}</ArrowLink>}
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
