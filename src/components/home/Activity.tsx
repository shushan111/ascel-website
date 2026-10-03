import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLatestNews } from "@/data/news";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { NewsCard } from "@/components/news/NewsCard";
import { getCoursesByDate } from "@/lib/courseIndex";

/**
 * Proof of life at the end of the page: the next real course on the calendar
 * and the latest news. Both come from the CMS; the section shrinks to
 * whatever exists.
 */
export async function Activity({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const newsT = await getTranslations("NewsHome");
  const [articles, courses] = await Promise.all([getLatestNews(3), getCoursesByDate()]);
  const next = courses.filter((course) => course.status === "upcoming").at(-1);
  if (!articles.length && !next) return null;

  return (
    <section className="bg-canvas py-24 md:py-band">
      <Container width="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="t-eyebrow text-muted">{t("activityEyebrow")}</p>
            <h2 className="t-h1 mt-5 text-ink">{newsT("title")}</h2>
          </div>
          <ArrowLink href="/news">{newsT("viewAll")}</ArrowLink>
        </div>

        {next ? (
          <Link
            href={`/courses/${next.slug}`}
            className="group mt-12 grid gap-3 border-y border-ink/80 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-8"
          >
            <span className="t-small text-accent-ink lg:col-span-2">{t("nextCourse")}</span>
            <span className="t-h3 text-ink transition-colors duration-300 group-hover:text-accent-ink lg:col-span-6">
              {loc(next.title, locale)}
            </span>
            <span className="t-meta text-muted lg:col-span-4 lg:text-right">
              {loc(next.date, locale)}
            </span>
          </Link>
        ) : null}

        {articles.length ? (
          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
