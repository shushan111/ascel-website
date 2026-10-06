import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ExternalIcon } from "@/components/ui/icons";

const linkClass =
  "group inline-flex min-h-11 items-center gap-2 text-[0.96875rem] font-medium text-ink transition-colors duration-200 hover:text-accent-ink";

/**
 * The one text-link affordance: "see everything", "learn more", the way on
 * to the next page. Ink at rest, bronze on hover, an arrow that moves.
 * Pass `external` for an off-site address — it opens in a new tab and says so
 * to screen readers.
 */
export function ArrowLink({
  href,
  children,
  className,
  external = false,
  externalLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  /** Screen-reader note for external links, e.g. "Opens in a new tab". */
  externalLabel?: string;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(linkClass, className)}>
        <span className="link-underline">{children}</span>
        <ExternalIcon className="h-3.5 w-3.5" />
        {externalLabel ? <span className="sr-only">{externalLabel}</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(linkClass, className)}>
      <span className="link-underline">{children}</span>
      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
