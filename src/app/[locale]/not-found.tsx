import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/icons";

/**
 * A missing page still offers the way on: home first, then the three places
 * most visitors are looking for.
 */
export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const nav = await getTranslations("Nav");
  const links = [
    { href: "/programs", label: nav("programs") },
    { href: "/courses", label: nav("courses") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <section className="bg-canvas py-20 md:py-band-wide">
      <Container className="max-w-xl text-center">
        <p className="t-figure text-line-strong">404</p>
        <h1 className="t-h1 mt-6 text-balance text-ink">{t("title")}</h1>
        <p className="t-body mt-4 text-muted">{t("body")}</p>
        <Link href="/" className={buttonClassName("primary", "mt-8", "lg")}>
          <ArrowLeftIcon />
          {t("cta")}
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-2 border-t border-line pt-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-10 items-center rounded-full border border-line-strong bg-paper px-4 text-[0.9375rem] text-ink transition-colors hover:border-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
