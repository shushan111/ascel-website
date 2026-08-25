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
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex shrink-0 items-center border border-line text-[11px] font-medium tracking-[0.12em] uppercase"
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          className={cn(
            "min-h-9 min-w-10 px-2 transition-colors",
            locale === code
              ? "bg-navy text-white"
              : "text-muted hover:text-navy",
            compact && "min-h-10",
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
