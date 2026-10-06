import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles, getNewsBySlug } from "@/data/news";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Prose } from "@/components/ui/Prose";
import { RichText } from "@/components/ui/RichText";
import { Gallery } from "@/components/ui/Gallery";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CalendarIcon } from "@/components/ui/icons";
import { NewsCard } from "@/components/news/NewsCard";

export async function generateStaticParams() {
  const articles = await getNewsArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${loc(article.title, locale)} | ASCEL`,
    description: loc(article.excerpt, locale),
    path: `/news/${article.slug}`,
    locale,
    image: article.image,
  });
}

/**
 * An article set as a reading column: the title and lead get the contrast,
 * the photograph follows at the column's own width, and the page ends with
 * the next stories rather than a dead end.
 */
export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [article, all] = await Promise.all([getNewsBySlug(slug), getNewsArticles()]);
  if (!article) notFound();
  const common = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const title = loc(article.title, locale);
  const more = all.filter((item) => item.slug !== article.slug).slice(0, 3);

  // Imported articles carry Portable Text; the hand-authored ones predate it
  // and still use the plain paragraph list.
  const richBody =
    article.richBody[locale as "ru" | "hy" | "en"] ??
    article.richBody.ru ??
    article.richBody.en;

  return (
    <>
      <article>
        <header className="bg-canvas pb-10 pt-4 md:pb-14 md:pt-6">
          <Container width="wide">
            <Breadcrumbs items={[{ label: nav("news"), href: "/news" }, { label: title }]} />
          </Container>
          <Container width="text" className="mt-8 md:mt-14">
            <p className="t-meta flex flex-wrap items-center gap-2 text-muted">
              <CalendarIcon className="h-3.5 w-3.5" />
              <time dateTime={article.date}>{loc(article.dateLabel, locale)}</time>
              {article.isPlaceholder ? <Badge>{common("sample")}</Badge> : null}
            </p>
            <h1 className="t-display mt-4 text-balance text-ink">{title}</h1>
            {loc(article.excerpt, locale) ? (
              <p className="t-lead mt-5 text-muted">{loc(article.excerpt, locale)}</p>
            ) : null}
          </Container>
        </header>

        {article.image ? (
          <div className="mx-auto max-w-[56rem] md:px-8">
            <figure className="relative aspect-[3/2] overflow-hidden bg-mist md:rounded-lg">
              <Image
                src={article.image}
                alt={loc(article.imageAlt, locale)}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 896px) 832px, 100vw"
              />
            </figure>
          </div>
        ) : null}

        <Container width="text" className="pb-16 pt-10 md:pb-24 md:pt-14">
          {richBody ? (
            <RichText value={richBody} />
          ) : (
            <Prose>
              {article.body.map((paragraph, index) => (
                <p key={`${index}-${paragraph.ru}`}>{loc(paragraph, locale)}</p>
              ))}
            </Prose>
          )}

          <Gallery images={article.gallery} locale={locale} title={common("gallery")} className="mt-14" />

          <div className="mt-12 border-t border-line pt-6">
            <ArrowLink href="/news">{common("backToNews")}</ArrowLink>
          </div>
        </Container>
      </article>

      {more.length ? (
        <Section tone="paper">
          <Container width="wide">
            <SectionHeader title={common("moreNews")} size="h3" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {more.map((item) => (
                <li key={item.id}>
                  <NewsCard article={item} locale={locale} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
