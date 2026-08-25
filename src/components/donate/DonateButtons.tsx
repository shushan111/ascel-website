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

  const donateClass = invert ? buttonClassName("donate") : buttonClassName("primary");
  const supportClass = invert
    ? buttonClassName("secondary", "border-white/30 text-white hover:bg-white/10 hover:border-white")
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
      <Link href="/programs" className={supportClass}>
        {t("supportPrograms")}
      </Link>
    </div>
  );
}
