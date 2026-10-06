import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * The way on from the end of a page to the next logical one: a single wide
 * link card with a label, a sentence and an arrow. Keeps a long page from
 * ending in a dead end without adding another full section.
 */
export function NextPageCard({
  href,
  label,
  title,
  className,
}: {
  href: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "card card-link group flex items-center justify-between gap-6 p-6 sm:p-8 md:p-10",
        className,
      )}
    >
      <span className="min-w-0">
        <span className="t-label block text-muted">{label}</span>
        <span className="t-h2 mt-3 block max-w-3xl text-balance text-ink">{title}</span>
      </span>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-on-dark md:h-14 md:w-14">
        <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
