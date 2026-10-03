import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { EventItem } from "@/types";
import { loc } from "@/lib/utils";

export async function EventCard({
  event,
  locale,
}: {
  event: EventItem;
  locale: string;
}) {
  const common = await getTranslations("Common");

  return (
    <article className="group flex gap-5 border-b border-line py-7 transition-colors duration-200 last:border-b-0 hover:border-line-strong md:gap-8">
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-md border border-line bg-canvas text-ink">
        <span className="t-meta-sm text-muted">{loc(event.month, locale)}</span>
        <span className="font-display mt-1 text-2xl font-medium leading-none tabular-nums">
          {event.day}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="t-h4 text-balance text-ink transition-colors duration-200 group-hover:text-accent-ink">
            {loc(event.title, locale)}
          </h3>
          {event.isPlaceholder ? (
            <span className="t-meta-sm text-muted">{common("sample")}</span>
          ) : null}
        </div>
        <p className="t-meta mt-2 text-muted">
          {loc(event.location, locale)}
        </p>
        <p className="t-small mt-3 text-muted">
          {loc(event.description, locale)}
        </p>
        <Link
          href={event.href}
          className="mt-4 inline-flex min-h-11 items-center text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:text-accent-ink"
        >
          {common("viewEvent")}
        </Link>
      </div>
    </article>
  );
}
