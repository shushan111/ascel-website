"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * The close every page shares: one sentence about what support builds, the
 * bronze action and the way to get in touch. It replaces the per-page closing
 * bands that each said this slightly differently, and steps aside on the
 * donate page, where the form already is the action.
 */
export function FooterCta() {
  const t = useTranslations("DonateHome");
  const nav = useTranslations("Nav");
  const pathname = usePathname();
  if (pathname === "/donate") return null;

  return (
    <div className="border-b border-night-line">
      <div className="mx-auto grid w-full max-w-[88rem] gap-8 px-5 py-14 sm:px-6 md:px-8 md:py-20 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <p className="t-eyebrow text-accent-light">{nav("donate")}</p>
          <p className="t-h1 mt-5 max-w-2xl text-balance text-on-dark">{t("title")}</p>
          <p className="t-body mt-5 max-w-xl text-on-dark/70">{t("body")}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Link href="/donate" className={buttonClassName("support", undefined, "lg")}>
            {t("donateNow")}
            <ArrowRightIcon className="btn-arrow" />
          </Link>
          <Link href="/contact" className={buttonClassName("outlineDark", undefined, "lg")}>
            {nav("contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
