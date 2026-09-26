import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="py-28 md:py-36">
      <Container className="max-w-xl text-center">
        <p className="t-meta-sm text-muted">404</p>
        <h1 className="t-h1 mt-4 text-balance text-ink">{t("title")}</h1>
        <p className="t-body mt-5 text-muted">{t("body")}</p>
        <Link href="/" className={buttonClassName("primary", "mt-9")}>
          {t("cta")}
        </Link>
      </Container>
    </section>
  );
}
