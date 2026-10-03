"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  function switchTo(next: AppLocale) {
    router.replace(pathname, { locale: next });
  }

  return (
    // Underlined rather than boxed: the reference rules the group off along
    // the bottom and marks the active language with a heavier rule.
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex shrink-0 items-center border-b border-line"
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          className={cn(
            "min-h-9 px-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] transition-colors",
            locale === code
              ? "border-b-2 border-ink text-ink"
              : "border-b-2 border-transparent text-muted hover:text-ink",
            compact && "min-h-11 px-3 text-[0.78rem]",
          )}
          aria-pressed={locale === code}
          aria-label={names[code]}
          title={names[code]}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
