import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/ui/icons";

export type Crumb = { label: string; href?: string };

/**
 * Where the visitor is: Home › Section › Page. The last crumb is the current
 * page and is not a link. On a phone only the parent is shown, as a back
 * link, so the trail never wraps into a paragraph.
 */
export async function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const t = await getTranslations("Nav");
  const trail: Crumb[] = [{ label: t("home"), href: "/" }, ...items];
  const parent = [...trail].reverse().find((item, index) => index > 0 && item.href);

  return (
    <nav aria-label={t("breadcrumb")} className={cn("t-small text-muted", className)}>
      {/* Phone: one back link to the parent. */}
      {parent?.href ? (
        <Link
          href={parent.href}
          className="inline-flex min-h-10 items-center gap-1.5 transition-colors hover:text-ink sm:hidden"
        >
          <ChevronRightIcon className="h-3.5 w-3.5 rotate-180" />
          {parent.label}
        </Link>
      ) : null}
      <ol className="hidden flex-wrap items-center gap-x-1.5 gap-y-1 sm:flex">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="inline-flex min-h-10 items-center transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="line-clamp-1 max-w-[22rem] text-ink">
                  {item.label}
                </span>
              )}
              {last ? null : <ChevronRightIcon className="h-3.5 w-3.5 text-line-strong" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
