"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { cn, isActiveNavPath } from "@/lib/utils";

export function DesktopNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    // The row absorbs the space between logo and actions and clips rather
    // than overlapping them if a font swap or zoom pushes it past its width.
    <nav aria-label={t("mainNav")} className="hidden min-w-0 flex-1 overflow-hidden lg:block">
      {/* Seven items: tighter type and padding below 1440px (unchanged from 1440 up), so the Armenian
          labels fit the row from 1024px up without clipping. */}
      <ul className="flex items-center justify-center gap-0 min-[1440px]:gap-1">
        {navItems.map((item) => {
          const active = isActiveNavPath(pathname, item.href);
          const label = "shortKey" in item ? t(item.shortKey) : t(item.key);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                title={"shortKey" in item ? t(item.key) : undefined}
                className={cn(
                  "relative inline-flex min-h-10 items-center whitespace-nowrap rounded-sm px-1 text-[0.8125rem] transition-colors duration-200 min-[1152px]:px-2 min-[1152px]:text-[0.875rem] xl:px-2.5 xl:text-[0.9375rem] min-[1440px]:px-3.5",
                  active ? "font-medium text-ink" : "text-muted hover:bg-mist/70 hover:text-ink",
                )}
              >
                {label}
                {/* The current page: a short bronze bar under the label. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-x-1 -bottom-[calc((var(--header-h)-2.5rem)/2)] h-0.5 origin-center rounded-full bg-accent transition-transform duration-300 min-[1152px]:inset-x-2 xl:inset-x-2.5 min-[1440px]:inset-x-3.5",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
