import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { NewsArticle } from "@/types";
import { loc } from "@/lib/utils";

export async function NewsCard({
  article,
  locale,
}: {
  article: NewsArticle;
  locale: string;
}) {
  const common = await getTranslations("Common");

  return (
    <article className="group flex h-full flex-col border border-line bg-white">
      <Link href={`/news/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={loc(article.imageAlt, locale)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted">
          <span className="text-accent">{loc(article.category, locale)}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{loc(article.dateLabel, locale)}</time>
          {article.isPlaceholder ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{common("sample")}</span>
            </>
          ) : null}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-navy text-balance">
          <Link href={`/news/${article.slug}`}>{loc(article.title, locale)}</Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
          {loc(article.excerpt, locale)}
        </p>
        <Link
          href={`/news/${article.slug}`}
          className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-navy underline-offset-4 hover:underline"
        >
          {common("readMore")}
        </Link>
      </div>
    </article>
  );
}
