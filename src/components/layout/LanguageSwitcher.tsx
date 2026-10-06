"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "@/components/ui/icons";

const labels: Record<AppLocale, string> = {
  en: "EN",
  hy: "ՀԱՅ",
  ru: "RU",
};

const names: Record<AppLocale, string> = {
  en: "English",
  hy: "Հայերեն",
  ru: "Русский",
};

/**
 * Two presentations of one control:
 * - `menu`: a compact button that opens a list of languages by their own
 *   names (desktop header — it frees the width three buttons took).
 * - `segmented`: all three side by side (mobile menu, where there is room).
 */
export function LanguageSwitcher({ variant = "segmented" }: { variant?: "menu" | "segmented" }) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [pending, startTransition] = useTransition();

  function switchTo(next: AppLocale) {
    if (next === locale) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  }

  if (variant === "menu") {
    return <LanguageMenu locale={locale} pending={pending} label={t("language")} onSelect={switchTo} />;
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      aria-busy={pending || undefined}
      className="inline-flex rounded-sm border border-line-strong bg-paper p-1"
    >
      {routing.locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => switchTo(code)}
            aria-pressed={active}
            className={cn(
              "min-h-10 min-w-[4.5rem] rounded-xs px-3 text-[0.9375rem] transition-colors duration-200",
              active ? "bg-ink text-on-dark" : "text-muted hover:bg-mist hover:text-ink",
            )}
          >
            {names[code]}
          </button>
        );
      })}
    </div>
  );
}

function LanguageMenu({
  locale,
  pending,
  label,
  onSelect,
}: {
  locale: AppLocale;
  pending: boolean;
  label: string;
  onSelect: (code: AppLocale) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    // Focus the current language so arrow-free Tab order starts in the list.
    rootRef.current?.querySelector<HTMLButtonElement>('[aria-current="true"]')?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${names[locale]}`}
        aria-busy={pending || undefined}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex min-h-10 items-center gap-1.5 rounded-sm px-2.5 text-[0.875rem] font-medium tracking-[0.04em] text-ink transition-colors hover:bg-mist/70",
          open && "bg-mist/70",
        )}
      >
        {pending ? <span className="spinner h-3.5 w-3.5 text-muted" /> : <GlobeIcon className="text-muted" />}
        <span lang={locale}>{labels[locale]}</span>
        <ChevronDownIcon className={cn("h-3.5 w-3.5 text-muted transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open ? (
        <ul
          id={listId}
          aria-label={label}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] animate-fade-in rounded-md border border-line bg-paper p-1.5 shadow-panel"
        >
          {routing.locales.map((code) => {
            const active = code === locale;
            return (
              <li key={code}>
                <button
                  type="button"
                  lang={code}
                  aria-current={active ? "true" : undefined}
                  onClick={() => {
                    setOpen(false);
                    onSelect(code);
                  }}
                  className={cn(
                    "flex min-h-10 w-full items-center justify-between gap-4 rounded-sm px-3 text-left text-[0.9375rem] transition-colors",
                    active ? "text-ink" : "text-muted hover:bg-mist hover:text-ink",
                  )}
                >
                  {names[code]}
                  {active ? <CheckIcon className="text-accent-ink" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
