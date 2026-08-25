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
    <article className="flex gap-5 border-b border-line py-6 last:border-b-0 md:gap-8">
      <div className="flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center border border-line bg-canvas text-navy">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
          {loc(event.month, locale)}
        </span>
        <span className="mt-1 text-2xl font-semibold leading-none">{event.day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-navy">
            {loc(event.title, locale)}
          </h3>
          {event.isPlaceholder ? (
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
              {common("sample")}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted">{loc(event.location, locale)}</p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {loc(event.description, locale)}
        </p>
        <Link
          href={event.href}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-navy underline-offset-4 hover:underline"
        >
          {common("viewEvent")}
        </Link>
      </div>
    </article>
  );
}
