"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { AlertIcon } from "@/components/ui/icons";

/**
 * When a page fails to render (most often the CMS not answering), the header
 * and footer stay and this takes the page's place: what happened, a retry,
 * and the way home.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("Common");
  const notFound = useTranslations("NotFound");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-canvas py-20 md:py-band-wide">
      <Container className="max-w-xl text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-danger-soft text-danger">
          <AlertIcon className="h-6 w-6" />
        </span>
        <h1 className="t-h1 mt-6 text-balance text-ink">{t("errorTitle")}</h1>
        <p className="t-body mt-4 text-muted">{t("errorBody")}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => retry()} className={buttonClassName("primary", undefined, "lg")}>
            {t("retry")}
          </button>
          <Link href="/" className={buttonClassName("secondary", undefined, "lg")}>
            {notFound("cta")}
          </Link>
        </div>
        {error.digest ? <p className="t-caption mt-8 font-mono text-muted">{error.digest}</p> : null}
      </Container>
    </section>
  );
}
