"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const navT = useTranslations("Nav");
  const headerT = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/92 backdrop-blur-md">
      <Container
        width="wide"
        className="flex min-h-[4.5rem] items-center justify-between gap-3 sm:gap-5 md:min-h-[5.25rem] md:gap-7"
      >
        <Link href="/" className="shrink-0 rounded-sm" aria-label="ASCEL">
          <Logo compact />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden min-[1280px]:block">
            <LanguageSwitcher />
          </div>
          {/* Small and constant: the way to give is always one click away,
              while the nav beside it keeps leading with the work. */}
          <Link
            href="/donate"
            className={cn(
              buttonClassName(
                "support",
                "min-h-10 whitespace-nowrap px-3.5 text-[0.875rem] sm:px-4 sm:text-[0.9375rem]",
              ),
            )}
          >
            {/* One word on a phone, where "Support / Donate" does not fit
                beside the logo and the menu button. */}
            <span className="sm:hidden">{headerT("donate")}</span>
            <span className="hidden sm:inline">{navT("donate")}</span>
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
