import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { NewsArticle } from "@/types";
import { cn, loc } from "@/lib/utils";
import { CoverImage } from "@/components/ui/CoverImage";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * A news item on a paper card: photograph, date, title, and on the larger
 * variants the excerpt. The whole card is one link (a stretched anchor on the
 * title). `lead` is the wide first story on the news index.
 */
export async function NewsCard({
  article,
  locale,
  variant = "default",
}: {
  article: NewsArticle;
  locale: string;
  variant?: "lead" | "default";
}) {
  const common = await getTranslations("Common");
  const title = loc(article.title, locale);
  const excerpt = loc(article.excerpt, locale);
  const lead = variant === "lead";

  return (
    <article
      className={cn(
        "card card-link group flex h-full flex-col overflow-hidden",
        lead && "lg:grid lg:grid-cols-12",
      )}
    >
      <div
        className={cn(
          "media-zoom relative aspect-[3/2] overflow-hidden bg-mist",
          lead && "lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]",
        )}
      >
        <CoverImage
          src={article.image}
          alt=""
          sizes={lead ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          priority={lead}
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-5 sm:p-6",
          lead && "lg:col-span-5 lg:justify-center lg:p-10 xl:p-12",
        )}
      >
        <p className="t-meta flex flex-wrap items-center gap-2 text-muted">
          <time dateTime={article.date}>{loc(article.dateLabel, locale)}</time>
          {article.isPlaceholder ? <Badge>{common("sample")}</Badge> : null}
        </p>
        <h3 className={cn("mt-3 text-balance text-ink", lead ? "t-h2" : "t-h4")}>
          <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {excerpt ? (
          <p className={cn("mt-3 text-muted", lead ? "t-body line-clamp-4" : "t-small line-clamp-3")}>
            {excerpt}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent-ink"
        >
          {common("readMore")}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
