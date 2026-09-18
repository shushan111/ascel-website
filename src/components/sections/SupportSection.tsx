import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DonateButtons } from "@/components/donate/DonateButtons";
import { DonationCategories } from "@/components/donate/DonationCategories";

export async function SupportSection({ locale }: { locale: string }) {
  const t = await getTranslations("DonateHome");
  const options = getDonationOptions();

  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="/images/donate-support.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-ink/88" />
      <Container className="relative">
        <div className="max-w-xl">
          <h2 className="t-h2 text-balance text-on-dark">{t("title")}</h2>
          <p className="t-body mt-5 text-on-dark/80">{t("body")}</p>
          <div className="mt-8">
            <DonateButtons invert />
          </div>
        </div>
        <div className="mt-16">
          <DonationCategories options={options} locale={locale} invert />
        </div>
      </Container>
    </Section>
  );
}
