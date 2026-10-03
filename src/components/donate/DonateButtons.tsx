import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { donationConfig } from "@/lib/config";
import { buttonClassName } from "@/components/ui/buttonStyles";

export async function DonateButtons({
  invert = false,
}: {
  invert?: boolean;
}) {
  const t = await getTranslations("DonateHome");
  const donateHref = donationConfig.providerUrl || "/donate";
  const donateExternal = Boolean(donationConfig.providerUrl);

  // The give action is bronze wherever it appears, so it is recognisable.
  const donateClass = buttonClassName("support");
  const supportClass = invert
    ? buttonClassName("outlineDark")
    : buttonClassName("secondary");

  return (
    <div className="flex flex-wrap gap-3">
      {donateExternal ? (
        <a
          href={donateHref}
          target="_blank"
          rel="noopener noreferrer"
          className={donateClass}
        >
          {t("donateNow")}
        </a>
      ) : (
        <Link href="/donate" className={donateClass}>
          {t("donateNow")}
        </Link>
      )}
      <Link href="/simulation-center" className={supportClass}>
        {t("supportPrograms")}
      </Link>
    </div>
  );
}
