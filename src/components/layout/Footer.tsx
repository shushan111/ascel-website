import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { footerNav, siteConfig } from "@/lib/config";
import { getProgramHref, getPrograms } from "@/data/programs";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { ExternalIcon, MapPinIcon } from "@/components/ui/icons";
import { FooterCta } from "./FooterCta";

const linkClass =
  "inline-flex min-h-9 items-center gap-1.5 text-[0.96875rem] text-on-dark/65 transition-colors duration-200 hover:text-on-dark";
const headingClass = "t-meta-sm text-on-dark/45";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("Footer");
  const navT = await getTranslations("Nav");
  const common = await getTranslations("Common");
  const programs = await getPrograms();
  const year = new Date().getFullYear();
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="bg-night text-on-dark/70">
      <FooterCta />

      <Container width="wide" className="grid gap-10 py-14 sm:grid-cols-2 md:py-16 lg:grid-cols-12 lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo invert />
          <p className="mt-5 max-w-[24rem] text-[0.96875rem] leading-7 text-on-dark/65">
            {t("description")}
          </p>
          <p className="mt-5 flex items-start gap-2 text-[0.9375rem] text-on-dark/65">
            <MapPinIcon className="mt-1 text-accent-light" />
            {siteConfig.contact.addressLine}
          </p>
        </div>

        <div className="lg:col-span-3 lg:col-start-6 xl:col-span-2">
          <p className={headingClass}>{t("navigation")}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-1">
            {footerNav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {navT(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 xl:col-span-3">
          <p className={headingClass}>{t("programs")}</p>
          <ul className="mt-4">
            {programs.map((program) => {
              const target = getProgramHref(program);
              if (target.external) {
                return (
                  <li key={program.id}>
                    <a href={target.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {loc(program.shortTitle, locale)}
                      <ExternalIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">{common("externalLink")}</span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={program.id}>
                  <Link href={target.href} className={linkClass}>
                    {loc(program.shortTitle, locale)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={headingClass}>{t("legal")}</p>
          <ul className="mt-4">
            <li>
              <Link href="/privacy" className={linkClass}>
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {t("terms")}
              </Link>
            </li>
          </ul>
          {social.length > 0 ? (
            <>
              <p className={`${headingClass} mt-8`}>{t("social")}</p>
              <ul className="mt-4" aria-label={t("social")}>
                {social.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`${linkClass} capitalize`}>
                      {name}
                      <span className="sr-only">{common("externalLink")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </Container>

      <div className="border-t border-night-line">
        <Container width="wide" className="flex flex-col gap-1 py-6 text-[0.84375rem] leading-6 text-on-dark/50 sm:flex-row sm:justify-between">
          <p>
            © {year} {t("copyright")}
          </p>
        </Container>
      </div>
    </footer>
  );
}
