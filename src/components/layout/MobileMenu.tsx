"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { cn, isActiveNavPath } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Logo } from "@/components/logo/Logo";
import { ChevronRightIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LanguageSwitcher } from "./LanguageSwitcher";

const MENU_ID = "mobile-navigation";
const EXIT_DURATION_MS = 260;
// The desktop row takes over from lg; the sheet covers everything below it.
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A sheet that slides in from the right: full width on a phone, a 26rem
 * panel over a dimmed page on a tablet. Destinations first (with the current
 * page marked), then language, then the support action pinned to the bottom
 * where a thumb reaches it.
 */
export function MobileMenu() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const exitTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(
    ({ immediate = false, restoreFocus = false } = {}) => {
      setEntered(false);
      if (restoreFocus) triggerRef.current?.focus();
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      if (immediate) {
        exitTimer.current = null;
        setMounted(false);
        return;
      }
      exitTimer.current = window.setTimeout(() => {
        exitTimer.current = null;
        setMounted(false);
      }, EXIT_DURATION_MS);
    },
    [],
  );

  function open() {
    if (exitTimer.current) {
      window.clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
    setMounted(true);
  }

  useEffect(() => {
    if (!mounted) return;
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close({ restoreFocus: true });
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mounted, close]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MEDIA_QUERY);
    function onChange(event: MediaQueryListEvent) {
      if (event.matches) close({ immediate: true });
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [close]);

  useEffect(
    () => () => {
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    },
    [],
  );

  const overlay = (
    <div className="fixed inset-0 z-100 lg:hidden">
      <div
        aria-hidden="true"
        onClick={() => close({ restoreFocus: true })}
        className={cn(
          "absolute inset-0 bg-night/45 backdrop-blur-[2px] transition-opacity duration-300 ease-out",
          entered ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        id={MENU_ID}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("mainNav")}
        className={cn(
          "absolute inset-y-0 right-0 flex h-dvh w-full flex-col bg-paper shadow-panel transition-transform duration-300 ease-out sm:max-w-[26rem]",
          entered ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-(--header-h) shrink-0 items-center justify-between gap-4 border-b border-line px-5 sm:px-6">
          <Link href="/" aria-label="ASCEL" className="min-w-0 rounded-sm" onClick={() => close()}>
            <Logo compact />
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-sm text-ink transition-colors hover:bg-mist"
            aria-label={t("closeMenu")}
            onClick={() => close({ restoreFocus: true })}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label={t("mainNav")} className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-4">
          <ul className="flex flex-col">
            <li>
              <MenuLink href="/" active={pathname === "/"} entered={entered} index={0} onNavigate={() => close()}>
                {t("home")}
              </MenuLink>
            </li>
            {navItems.map((item, index) => (
              <li key={item.key}>
                <MenuLink
                  href={item.href}
                  active={isActiveNavPath(pathname, item.href)}
                  entered={entered}
                  index={index + 1}
                  onNavigate={() => close()}
                >
                  {t(item.key)}
                </MenuLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={cn(
            "shrink-0 space-y-5 border-t border-line bg-canvas px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 transition-opacity duration-300 sm:px-6",
            entered ? "opacity-100 delay-150" : "opacity-0",
          )}
        >
          <div>
            <p className="t-label mb-2.5 text-muted">{t("language")}</p>
            <LanguageSwitcher variant="segmented" />
          </div>
          <Link href="/donate" onClick={() => close()} className={buttonClassName("support", "w-full", "lg")}>
            {t("donate")}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="-mr-1.5 grid h-11 w-11 place-items-center rounded-sm text-ink transition-colors hover:bg-mist lg:hidden"
        aria-label={t("openMenu")}
        aria-expanded={mounted}
        aria-controls={MENU_ID}
        onClick={open}
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {/* Portaled to the body: the header's backdrop-filter would otherwise
          become the containing block and clamp the overlay to the header. */}
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}

function MenuLink({
  href,
  active,
  entered,
  index,
  onNavigate,
  children,
}: {
  href: string;
  active: boolean;
  entered: boolean;
  index: number;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      style={{ transitionDelay: entered ? `${60 + index * 30}ms` : "0ms" }}
      className={cn(
        "group relative flex min-h-13 items-center justify-between gap-4 rounded-sm px-3 py-2.5 font-display text-[1.1875rem] leading-snug transition-[opacity,transform,background-color,color] duration-300 ease-out",
        active ? "bg-mist/80 text-ink" : "text-ink hover:bg-mist/60",
        entered ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
      )}
    >
      {active ? (
        <span aria-hidden="true" className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-accent" />
      ) : null}
      <span className="min-w-0">{children}</span>
      <ChevronRightIcon className="text-line-strong transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-muted" />
    </Link>
  );
}
