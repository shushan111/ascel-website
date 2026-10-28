import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { getDonationByPublicRef } from "@/lib/donations/store";
import type { DonationStatus } from "@/lib/donations/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DonateResult" });
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaTitle"),
    path: "/donate/result",
    locale,
    noIndex: true,
  });
}

type View = "paid" | "pending" | "failed" | "cancelled" | "refunded" | "notFound";

const views: Record<DonationStatus, View> = {
  paid: "paid",
  pending: "pending",
  needsReview: "pending",
  failed: "failed",
  expired: "failed",
  cancelled: "cancelled",
  refunded: "refunded",
  partiallyRefunded: "refunded",
};

/**
 * Where the donor lands after the bank. It only reads: the status was asked of
 * the bank on the way here (api/donations/return), and `ref` is a random token
 * that names one donation without revealing anything about it. The page shows
 * the donor's own first name and amount, nothing else from the record.
 */
export default async function DonateResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DonateResult");
  const { ref } = await searchParams;

  const publicRef = typeof ref === "string" && /^[a-f0-9]{32}$/.test(ref) ? ref : null;
  const donation = publicRef ? await getDonationByPublicRef(publicRef).catch(() => null) : null;
  const view: View = donation ? views[donation.status] ?? "pending" : "notFound";

  const amount = donation
    ? String(donation.amount).replace(/\B(?=(\d{3})+(?!\d))/g, locale === "en" ? "," : " ")
    : "";
  const title =
    view === "paid"
      ? donation?.firstName
        ? t("paidTitle", { name: donation.firstName })
        : t("paidTitleAnonymous")
      : t(`${view}Title`);
  const body = view === "paid" ? t("paidBody", { amount }) : t(`${view}Body`);

  return (
    <section className="bg-canvas py-20 md:py-band-wide">
      <Container className="max-w-xl text-center">
        <h1 className="t-h1 text-balance text-ink">{title}</h1>
        <p className="t-body mt-4 text-muted">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {view === "failed" || view === "notFound" ? (
            <Link href="/donate" className={buttonClassName("support", "", "lg")}>
              {t("tryAgain")}
              <ArrowRightIcon className="btn-arrow" />
            </Link>
          ) : null}
          {view === "paid" || view === "pending" ? (
            <Link href="/" className={buttonClassName("primary", "", "lg")}>
              <ArrowLeftIcon />
              {t("home")}
            </Link>
          ) : (
            <Link href="/contact" className={buttonClassName("primary", "", "lg")}>
              {t("contact")}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
