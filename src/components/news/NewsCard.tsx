import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { NewsArticle } from "@/types";
import { cn, loc } from "@/lib/utils";

/**
 * Mirrors the information hierarchy of gyumriorthoschool.org/news — image,
 * then a strong title, then the date as line-strong text — but drops the card
 * box entirely. Structure comes from a hairline rule and whitespace instead
 * of a border-plus-shadow container.
 *
 * `feature` is the two-column news index, `compact` the three-up home preview.
 */
export async function NewsCard({
  article,
  locale,
  variant = "compact",
}: {
  article: NewsArticle;
  locale: string;
  variant?: "feature" | "compact";
}) {
  const common = await getTranslations("Common");
  const feature = variant === "feature";
  const href = `/news/${article.slug}`;

  return (
    <article className="group flex h-full flex-col border-t border-line pt-6 transition-colors duration-200 hover:border-line-strong md:pt-8">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          "relative block overflow-hidden rounded-md bg-mist",
          feature ? "aspect-[3/2]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={article.image}
          alt={loc(article.imageAlt, locale)}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          sizes={
            feature
              ? "(min-width: 768px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
        />
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        {/* The category was bronze on every card, which put two accent marks
            in each item and made the colour ambient instead of meaningful.
            It is a quiet label; the accent stays for hover. */}
        <p className="t-meta-sm flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted">
          <span>{loc(article.category, locale)}</span>
          {article.isPlaceholder ? (
            <>
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
              <span className="text-muted">{common("sample")}</span>
            </>
          ) : null}
        </p>

        <h3
          className={cn(
            "mt-3 text-balance text-ink transition-colors duration-200 group-hover:text-accent",
            feature ? "t-h3" : "t-h4",
          )}
        >
          <Link href={href}>{loc(article.title, locale)}</Link>
        </h3>

        {/* Date sits below the title, as it does on the reference site — and
            at .t-meta, not .t-meta-sm: 11.5px uppercase bold competed with
            the title above it. The reference sets the same date at 20px
            regular grey and lets it sit quietly. */}
        <p className="t-meta mt-3 text-muted">
          <time dateTime={article.date}>{loc(article.dateLabel, locale)}</time>
        </p>

        {feature ? (
          <>
            <p className="t-small mt-4 flex-1 text-muted">
              {loc(article.excerpt, locale)}
            </p>
            <span
              aria-hidden="true"
              className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink transition-colors duration-200 group-hover:text-accent"
            >
              {common("readMore")}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M8.7 3.3 7.9 4.1l3.3 3.3H2.5v1.2h8.7l-3.3 3.3.8.8L13.4 8 8.7 3.3Z"
                />
              </svg>
            </span>
          </>
        ) : null}
      </div>
    </article>
  );
}
