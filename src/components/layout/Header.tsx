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
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      {/* The 2px ink rule capping the masthead is the reference's signature
          opening mark — it reads as a printed rule above the page. */}
      <div aria-hidden="true" className="h-0.5 w-full bg-ink" />
      <Container
        width="wide"
        className="flex min-h-[5.35rem] items-center justify-between gap-5"
      >
        <Link href="/" className="shrink-0 rounded-sm" aria-label="ASCEL">
          <Logo compact />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-3">
          <div className="hidden min-[1280px]:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/donate"
            className={cn(buttonClassName("primary"), "hidden sm:inline-flex")}
          >
            {headerT("donate")}
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
