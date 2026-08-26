import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { footerNav, siteConfig } from "@/lib/config";
import { getProgramHref, getPrograms } from "@/data/programs";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { ExternalIcon } from "@/components/ui/ExternalIcon";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("Footer");
  const navT = await getTranslations("Nav");
  const common = await getTranslations("Common");
  const programs = getPrograms();
  const year = new Date().getFullYear();
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo invert />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            {t("description")}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            {t("navigation")}
          </p>
          <ul className="mt-4 space-y-2">
            {footerNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {navT(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            {t("programs")}
          </p>
          <ul className="mt-4 space-y-2">
            {programs.map((program) => {
              const target = getProgramHref(program);
              if (target.external) {
                return (
                  <li key={program.id}>
                    <a
                      href={target.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
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
                  <Link
                    href={target.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {loc(program.shortTitle, locale)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            {t("legal")}
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/privacy" className="text-sm text-white/75 hover:text-white">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-white/75 hover:text-white">
                {t("terms")}
              </Link>
            </li>
          </ul>
          {social.length > 0 ? (
            <ul className="mt-6 flex gap-3" aria-label={t("social")}>
              {social.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm capitalize text-white/75 hover:text-white"
                  >
                    {name}
                    <span className="sr-only">{common("externalLink")}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-white/40">{common("contentPending")}</p>
          )}
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {year} {t("copyright")}
          </p>
        </Container>
      </div>
    </footer>
  );
}
