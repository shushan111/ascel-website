"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { cn, isActiveNavPath } from "@/lib/utils";

export function DesktopNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    // Armenian and Russian labels fill the masthead almost exactly, so the
    // nav absorbs the remaining space and clips rather than overlapping the logo
    // if a font swap or page zoom pushes it past the available width.
    <nav
      aria-label={t("mainNav")}
      className="hidden min-w-0 flex-1 overflow-hidden min-[1280px]:block"
    >
      <ul className="flex items-center justify-end">
        {navItems.map((item) => {
          const active = isActiveNavPath(pathname, item.href);
          return (
            // The donate link duplicates the adjacent Donate CTA, and dropping it
            // is what buys the row enough headroom for the longer locales.
            <li key={item.key} className={cn(item.key === "donate" && "hidden")}>
              <Link
                href={item.href}
                className={cn(
                  // Sizing stays uniform across desktop widths: the container is
                  // capped, so a larger step would only overflow.
                  "group relative inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[0.88rem] font-semibold transition-colors",
                  active ? "text-ink" : "text-body hover:text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {t(item.key)}
                {/* A 1px ink rule under the label, as on the reference. No pill,
                    no fill, no second colour. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-x-2.5 bottom-2 h-px origin-left bg-ink transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
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
