"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations("Nav");
  const headerT = useTranslations("Header");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="min-w-0 shrink-0" aria-label="ASCEL">
          <Logo />
        </Link>
        <nav aria-label={t("mainNav")} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[13px] text-muted transition-colors hover:text-navy",
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
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/donate"
            className={cn(buttonClassName("donate"), "hidden sm:inline-flex")}
          >
            {headerT("donate")}
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
