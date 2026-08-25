"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { mobileNavItems } from "@/lib/config";
import { cn, isActiveNavPath } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Logo } from "@/components/logo/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const MENU_ID = "mobile-navigation";
const EXIT_DURATION_MS = 240;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu() {
  const t = useTranslations("Nav");
  const headerT = useTranslations("Header");
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
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

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
    <div
      id={MENU_ID}
      role="dialog"
      aria-modal="true"
      aria-label={t("mainNav")}
      className={cn(
        "fixed inset-0 z-100 h-[100vh] w-full bg-white transition-opacity duration-300 ease-out supports-[height:100dvh]:h-[100dvh] lg:hidden",
        entered ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          "h-full w-full overflow-y-auto overscroll-contain transition-transform duration-300 ease-out",
          entered ? "scale-100" : "scale-[0.98]",
        )}
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1200px] flex-col px-5 pb-10 pt-4 sm:px-8">
          <div className="flex h-[72px] shrink-0 items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="ASCEL"
              className="min-w-0"
              onClick={() => close()}
            >
              <Logo compact />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border border-line text-navy transition-colors hover:border-navy"
              aria-label={t("closeMenu")}
              onClick={() => close({ restoreFocus: true })}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.2 5.8 5.8 6.2 11.6 12l-5.8 5.8.4.4L12 12.4l5.8 5.8.4-.4L12.4 12l5.8-5.8-.4-.4L12 11.6 6.2 5.8Z"
                />
              </svg>
            </button>
          </div>

          <div className="h-px w-full shrink-0 bg-line" />

          <nav
            aria-label={t("mainNav")}
            className="flex flex-1 flex-col justify-center py-4 sm:py-6"
          >
            <ul className="flex flex-col">
              {mobileNavItems.map((item, index) => {
                const active = isActiveNavPath(pathname, item.href);
                return (
                  <li
                    key={item.key}
                    className={cn(
                      "border-b border-line/70 transition duration-300 ease-out last:border-b-0",
                      entered
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1.5 opacity-0",
                    )}
                    style={{
                      transitionDelay: entered ? `${70 + index * 35}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => close()}
                      className={cn(
                        "flex min-h-12 items-center justify-between gap-4 py-2 text-2xl font-semibold tracking-tight transition-colors sm:min-h-14 sm:text-[1.75rem]",
                        active ? "text-accent" : "text-navy hover:text-accent",
                      )}
                    >
                      <span className="min-w-0">{t(item.key)}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[11px] font-medium tracking-[0.18em] text-muted/70"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="h-px w-full shrink-0 bg-line" />

          <div
            className={cn(
              "shrink-0 pt-6 transition-opacity duration-300 ease-out sm:flex sm:items-end sm:justify-between sm:gap-6",
              entered ? "opacity-100" : "opacity-0",
            )}
            style={{
              transitionDelay: entered
                ? `${70 + mobileNavItems.length * 35}ms`
                : "0ms",
            }}
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {t("language")}
              </p>
              <div className="mt-3">
                <LanguageSwitcher compact />
              </div>
            </div>
            <Link
              href="/donate"
              onClick={() => close()}
              className={cn(
                buttonClassName("donate"),
                "mt-6 w-full sm:mt-0 sm:w-auto sm:min-w-[13rem]",
              )}
            >
              {headerT("donate")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-navy transition-colors hover:border-navy lg:hidden"
        aria-label={t("openMenu")}
        aria-expanded={mounted}
        aria-controls={MENU_ID}
        onClick={open}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 7h16v1.5H4V7Zm0 4.25h16v1.5H4v-1.5ZM4 15.5h16V17H4v-1.5Z"
          />
        </svg>
      </button>

      {/* Portaled to the body: the header's backdrop-filter would otherwise
          become the containing block and clamp the overlay to the header. */}
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
