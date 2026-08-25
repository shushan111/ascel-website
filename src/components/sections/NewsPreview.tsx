import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLatestNews } from "@/data/news";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NewsCard } from "@/components/news/NewsCard";

export async function NewsPreview({ locale }: { locale: string }) {
  const t = await getTranslations("NewsHome");
  const articles = getLatestNews(3);

  return (
    <Section tone="canvas">
      <Container>
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Link
              href="/news"
              className="text-sm font-medium text-navy underline-offset-4 hover:underline"
            >
              {t("viewAll")}
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
