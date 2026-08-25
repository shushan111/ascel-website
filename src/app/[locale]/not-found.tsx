import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="py-28">
      <Container className="max-w-xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-navy">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("body")}</p>
        <Link href="/" className={buttonClassName("primary", "mt-8")}>
          {t("cta")}
        </Link>
      </Container>
    </section>
  );
}
