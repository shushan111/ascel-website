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
    <article className="flex gap-5 border-b border-line py-7 last:border-b-0 md:gap-8">
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-md border border-line bg-canvas text-ink">
        <span className="t-meta-sm text-muted">{loc(event.month, locale)}</span>
        <span className="font-display mt-1 text-2xl font-semibold leading-none tabular-nums">
          {event.day}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="t-h4 text-balance text-ink">
            {loc(event.title, locale)}
          </h3>
          {event.isPlaceholder ? (
            <span className="t-meta-sm text-muted">{common("sample")}</span>
          ) : null}
        </div>
        <p className="t-meta-sm mt-2 text-accent">
          {loc(event.location, locale)}
        </p>
        <p className="t-small mt-3 text-muted">
          {loc(event.description, locale)}
        </p>
        <Link
          href={event.href}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {common("viewEvent")}
        </Link>
      </div>
    </article>
  );
}
