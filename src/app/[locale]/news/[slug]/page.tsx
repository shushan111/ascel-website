import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsArticles, getNewsBySlug } from "@/data/news";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function generateStaticParams() {
  return getNewsArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getNewsBySlug(slug);
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
  const article = getNewsBySlug(slug);
  if (!article) notFound();
  const common = await getTranslations("Common");

  return (
    <>
      <section className="relative min-h-[46vh] overflow-hidden bg-navy">
        <Image
          src={article.image}
          alt={loc(article.imageAlt, locale)}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <Container className="relative flex min-h-[46vh] flex-col justify-end py-16">
          <Link href="/news" className="mb-6 text-sm text-white/70 hover:text-white">
            ← {common("backToNews")}
          </Link>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
            {loc(article.category, locale)} · {loc(article.dateLabel, locale)}
            {article.isPlaceholder ? ` · ${common("sample")}` : ""}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {loc(article.title, locale)}
          </h1>
        </Container>
      </section>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-lg leading-8 text-ink">{loc(article.excerpt, locale)}</p>
          <div className="mt-8 space-y-5">
            {article.body.map((paragraph) => (
              <p key={paragraph.en} className="text-base leading-7 text-muted">
                {loc(paragraph, locale)}
              </p>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
