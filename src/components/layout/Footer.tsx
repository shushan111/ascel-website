import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { footerNav, siteConfig } from "@/lib/config";
import { getProgramHref, getPrograms } from "@/data/programs";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { ExternalIcon } from "@/components/ui/ExternalIcon";

const linkClass =
  "text-sm leading-6 text-on-dark/70 transition-colors hover:text-on-dark";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("Footer");
  const navT = await getTranslations("Nav");
  const common = await getTranslations("Common");
  const programs = await getPrograms();
  const year = new Date().getFullYear();
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="bg-ink text-on-dark/70">
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo invert />
          <p className="mt-5 max-w-xs text-sm leading-6 text-on-dark/70">
            {t("description")}
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="t-meta-sm text-on-dark">{t("navigation")}</p>
          <ul className="mt-5 space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {navT(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="t-meta-sm text-on-dark">{t("programs")}</p>
          <ul className="mt-5 space-y-2.5">
            {programs.map((program) => {
              const target = getProgramHref(program);
              if (target.external) {
                return (
                  <li key={program.id}>
                    <a
                      href={target.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} inline-flex items-center gap-1.5`}
                    >
                      {loc(program.shortTitle, locale)}
                      <ExternalIcon />
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
          <p className="t-meta-sm text-on-dark">{t("legal")}</p>
          <ul className="mt-5 space-y-2.5">
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
            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2" aria-label={t("social")}>
              {social.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} capitalize`}
                  >
                    {name}
                    <span className="sr-only">{common("externalLink")}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-7 text-sm text-on-dark/60">{common("contentPending")}</p>
          )}
        </div>
      </Container>
      <div className="border-t border-on-dark/15">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-5 text-on-dark/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {t("copyright")}
          </p>
          <p>{siteConfig.contact.addressLine}</p>
        </Container>
      </div>
    </footer>
  );
}
