import { getTranslations } from "next-intl/server";
import { getLatestNews } from "@/data/news";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsCard } from "@/components/news/NewsCard";

/**
 * Proof of life near the end of the page: the latest news from the CMS. The
 * next course on the calendar moved up beside the course archive, where it
 * belongs. The section removes itself when there is nothing to show.
 */
export async function Activity({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const newsT = await getTranslations("NewsHome");
  const articles = await getLatestNews(3);
  if (!articles.length) return null;

  return (
    <Section tone="paper">
      <Container width="wide">
        <SectionHeader
          eyebrow={t("activityEyebrow")}
          title={newsT("title")}
          action={<ArrowLink href="/news">{newsT("viewAll")}</ArrowLink>}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-6">
          {articles.map((article, index) => (
            <FadeIn key={article.id} delay={index * 0.06} className="h-full">
              <NewsCard article={article} locale={locale} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
