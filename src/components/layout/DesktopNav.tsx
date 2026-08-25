"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { cn, isActiveNavPath } from "@/lib/utils";

export function DesktopNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    // Armenian and Russian labels fill the 1200px header almost exactly, so the
    // nav absorbs the remaining space and clips rather than overlapping the logo
    // if a font swap or page zoom pushes it past the available width.
    <nav
      aria-label={t("mainNav")}
      className="hidden min-w-0 flex-1 overflow-hidden min-[1200px]:block"
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
                  // capped at 1200px, so a larger xl step would only overflow.
                  "inline-flex min-h-11 items-center whitespace-nowrap px-2 text-[12.5px] text-muted transition-colors hover:text-navy",
                  active && "text-navy",
                )}
                aria-current={active ? "page" : undefined}
              >
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
