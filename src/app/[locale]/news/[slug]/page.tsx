import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles, getNewsBySlug } from "@/data/news";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { RichText } from "@/components/ui/RichText";
import { Gallery } from "@/components/ui/Gallery";
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

  // Imported articles carry Portable Text; the hand-authored ones predate it
  // and still use the plain paragraph list.
  const richBody =
    article.richBody[locale as "ru" | "hy" | "en"] ??
    article.richBody.ru ??
    article.richBody.en;

  return (
    <article>
      {/* Light, editorial opening rather than a dark image overlay: the title
          and the lead are what this page exists for, so they get the contrast. */}
      <header className="bg-canvas pt-10 pb-14 md:pt-14 md:pb-20">
        <Container width="text">
          <Link
            href="/news"
            className="inline-flex min-h-9 items-center gap-2 text-[0.92rem] text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            {common("backToNews")}
          </Link>

          <h1 className="t-display mt-10 text-balance text-ink">
            {loc(article.title, locale)}
          </h1>
          {loc(article.excerpt, locale) ? (
            <p className="t-lead mt-6 text-muted">{loc(article.excerpt, locale)}</p>
          ) : null}
          <p className="t-meta mt-6 text-muted">
            <time dateTime={article.date}>{loc(article.dateLabel, locale)}</time>
            {article.isPlaceholder ? <span> · {common("sample")}</span> : null}
          </p>
        </Container>
      </header>

      {article.image ? (
        <div className="mx-auto max-w-[100rem] md:px-8">
          <figure className="relative aspect-[3/2] bg-mist sm:aspect-[2/1]">
            <Image
              src={article.image}
              alt={loc(article.imageAlt, locale)}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </figure>
        </div>
      ) : null}

      <Container width="text" className="pt-12 pb-20 md:pt-16 md:pb-28">
        {richBody ? (
          <RichText value={richBody} />
        ) : (
          <Prose>
            {article.body.map((paragraph, index) => (
              <p key={`${index}-${paragraph.ru}`}>{loc(paragraph, locale)}</p>
            ))}
          </Prose>
        )}

        <Gallery images={article.gallery} locale={locale} title={common("gallery")} className="mt-16" />

        <div className="mt-14 border-t border-line pt-8">
          <Link href="/news" className={buttonClassName("secondary")}>
            {common("backToNews")}
          </Link>
        </div>
      </Container>
    </article>
  );
}
