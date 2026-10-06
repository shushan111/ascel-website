import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { donationConfig } from "@/lib/config";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon } from "@/components/ui/icons";

export async function DonateButtons({
  invert = false,
}: {
  invert?: boolean;
}) {
  const t = await getTranslations("DonateHome");
  const donateHref = donationConfig.providerUrl || "/donate";
  const donateExternal = Boolean(donationConfig.providerUrl);

  // The give action is bronze wherever it appears, so it is recognisable.
  const donateClass = buttonClassName("support", undefined, "lg");
  const supportClass = buttonClassName(invert ? "outlineDark" : "secondary", undefined, "lg");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {donateExternal ? (
        <a href={donateHref} target="_blank" rel="noopener noreferrer" className={donateClass}>
          {t("donateNow")}
          <ArrowRightIcon className="btn-arrow" />
        </a>
      ) : (
        <Link href="/donate" className={donateClass}>
          {t("donateNow")}
          <ArrowRightIcon className="btn-arrow" />
        </Link>
      )}
      <Link href="/simulation-center" className={supportClass}>
        {t("supportPrograms")}
      </Link>
    </div>
  );
}
