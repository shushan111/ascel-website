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
        "group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover",
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
