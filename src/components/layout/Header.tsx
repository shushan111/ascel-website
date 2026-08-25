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
  const headerT = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label="ASCEL">
          <Logo compact />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-3">
          <div className="hidden min-[1200px]:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/donate"
            className={cn(buttonClassName("donate"), "hidden sm:inline-flex")}
          >
            {headerT("donate")}
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
