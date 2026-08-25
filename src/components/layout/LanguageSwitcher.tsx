"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  function switchTo(next: "en" | "hy") {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex items-center border border-line text-[11px] font-medium tracking-[0.14em] uppercase"
    >
      {(["en", "hy"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          className={cn(
            "min-h-9 min-w-11 px-2.5 transition-colors",
            locale === code
              ? "bg-navy text-white"
              : "text-muted hover:text-navy",
            compact && "min-h-10",
          )}
          aria-pressed={locale === code}
        >
          {code === "en" ? "EN" : "ՀԱՅ"}
        </button>
      ))}
    </div>
  );
}
