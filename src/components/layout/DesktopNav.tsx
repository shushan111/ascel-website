"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { cn, isActiveNavPath } from "@/lib/utils";

export function DesktopNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("mainNav")} className="hidden min-w-0 lg:block">
      <ul className="flex items-center justify-end gap-0.5">
        {navItems.map((item) => {
          const active = isActiveNavPath(pathname, item.href);
          return (
            // Between lg and xl the row is too narrow for every label, and the
            // donate link duplicates the adjacent CTA button.
            <li key={item.key} className={cn(item.key === "donate" && "hidden xl:block")}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex min-h-11 items-center whitespace-nowrap px-1.5 text-[12px] text-muted transition-colors hover:text-navy xl:px-2.5 xl:text-[13px]",
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
