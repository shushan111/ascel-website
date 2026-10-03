import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { NewsArticle } from "@/types";
import { cn, loc } from "@/lib/utils";
import { CoverImage } from "@/components/ui/CoverImage";

/**
 * Photograph, title, then the date — quiet, after the title. No box: the
 * whole surface is one link (a stretched anchor on the title) and the image
 * eases on hover. `lead` is the large first story on the news index.
 */
export async function NewsCard({
  article,
  locale,
  variant = "compact",
}: {
  article: NewsArticle;
  locale: string;
  variant?: "lead" | "feature" | "compact";
}) {
  const common = await getTranslations("Common");
  const title = loc(article.title, locale);
  const lead = variant === "lead";

  return (
    <article className={cn("group relative", lead && "grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10")}>
      <div
        className={cn(
          "relative overflow-hidden bg-mist",
          lead ? "aspect-[3/2] lg:col-span-8" : "aspect-[3/2]",
        )}
      >
        <CoverImage
          src={article.image}
          alt=""
          label={title}
          sizes={lead ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className={cn(lead ? "lg:col-span-4 lg:pb-2" : "pt-5")}>
        <h3
          className={cn(
            "text-balance text-ink transition-colors duration-300 group-hover:text-accent-ink",
            lead ? "t-h1" : variant === "feature" ? "t-h3" : "t-h4",
          )}
        >
          <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {lead && loc(article.excerpt, locale) ? (
          <p className="t-body mt-5 text-muted">{loc(article.excerpt, locale)}</p>
        ) : null}
        <p className="t-meta mt-3 text-muted">
          <time dateTime={article.date}>{loc(article.dateLabel, locale)}</time>
          {article.isPlaceholder ? <span> · {common("sample")}</span> : null}
        </p>
      </div>
    </article>
  );
}
