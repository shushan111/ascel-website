import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles, getNewsBySlug } from "@/data/news";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { buttonClassName } from "@/components/ui/buttonStyles";

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

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getNewsBySlug(slug);
  if (!article) notFound();
  const common = await getTranslations("Common");

  return (
    <article>
      {/* Light, editorial opening rather than a dark image overlay: the title
          and the lead are what this page exists for, so they get the contrast. */}
      <header className="bg-canvas pt-10 pb-14 md:pt-14 md:pb-20">
        <Container width="text">
          <Link
            href="/news"
            className="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                fill="currentColor"
                d="m7.3 3.3.8.8L4.8 7.4h8.7v1.2H4.8l3.3 3.3-.8.8L2.6 8 7.3 3.3Z"
              />
            </svg>
            {common("backToNews")}
          </Link>

          <p className="t-meta-sm mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-accent">
            <span>{loc(article.category, locale)}</span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <time dateTime={article.date} className="text-muted">
              {loc(article.dateLabel, locale)}
            </time>
            {article.isPlaceholder ? (
              <>
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
                <span className="text-muted">{common("sample")}</span>
              </>
            ) : null}
          </p>

          <h1 className="t-display mt-5 text-balance text-ink">
            {loc(article.title, locale)}
          </h1>
          <p className="t-lead mt-6 text-muted">{loc(article.excerpt, locale)}</p>
        </Container>
      </header>

      <Container className="mt-10 md:mt-14">
        <figure className="relative aspect-[16/10] overflow-hidden rounded-md bg-mist">
          <Image
            src={article.image}
            alt={loc(article.imageAlt, locale)}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1136px, 100vw"
          />
        </figure>
      </Container>

      <Container width="text" className="pt-12 pb-20 md:pt-16 md:pb-28">
        <Prose>
          {article.body.map((paragraph) => (
            <p key={paragraph.en}>{loc(paragraph, locale)}</p>
          ))}
        </Prose>

        <div className="mt-14 border-t border-line pt-8">
          <Link href="/news" className={buttonClassName("secondary")}>
            {common("backToNews")}
          </Link>
        </div>
      </Container>
    </article>
  );
}
