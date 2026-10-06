"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

/**
 * Logo, the six destinations, language, and the one constant action. At rest
 * the header sits on the page's own ground; once the page scrolls it gains a
 * paper surface and a soft edge so it reads as chrome over content.
 */
export function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-line/60 bg-paper/92 shadow-header"
          : "border-line/70 bg-canvas/90",
      )}
    >
      <Container width="wide" className="flex h-(--header-h) items-center gap-3 sm:gap-4 lg:gap-6">
        <Link href="/" className="shrink-0 rounded-sm" aria-label="ASCEL">
          <Logo />
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher variant="menu" />
          </div>
          {/* Small and constant: the way to give is always one click away. */}
          <Link
            href="/donate"
            className={buttonClassName("support", "whitespace-nowrap px-3.5 sm:px-4", "sm")}
          >
            {t("donate")}
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
