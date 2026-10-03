import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** The one "see everything" affordance used across section headers. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        // Ink at rest, bronze on hover. As a standing bronze link this
        // appeared in every section header and was a third of the accent
        // budget on its own.
        "group inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:text-accent-ink",
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M8.7 3.3 7.9 4.1l3.3 3.3H2.5v1.2h8.7l-3.3 3.3.8.8L13.4 8 8.7 3.3Z"
        />
      </svg>
    </Link>
  );
}
