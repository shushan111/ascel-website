"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/config";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "@/components/logo/Logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  const headerT = useTranslations("Header");
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-navy"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">{t("openMenu")}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 7h16v1.5H4V7Zm0 4.25h16v1.5H4v-1.5ZM4 15.5h16V17H4v-1.5Z"
          />
        </svg>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-navy-deep/40"
          onClick={() => setOpen(false)}
        >
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p id={titleId} className="sr-only">
                {t("mainNav")}
              </p>
              <Logo compact />
              <button
                ref={closeRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">{t("closeMenu")}</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.2 5.8 5.8 6.2 11.6 12l-5.8 5.8.4.4L12 12.4l5.8 5.8.4-.4L12.4 12l5.8-5.8-.4-.4L12 11.6 6.2 5.8Z"
                  />
                </svg>
              </button>
            </div>
            <nav aria-label={t("mainNav")} className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="block min-h-11 py-3 text-base text-navy"
                      onClick={() => setOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              <LanguageSwitcher compact />
              <Link href="/donate" className={buttonClassName("donate")} onClick={() => setOpen(false)}>
                {headerT("donate")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
