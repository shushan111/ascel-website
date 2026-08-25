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
    <Section tone="navy" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="/images/donate-support.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-navy/80" />
      <Container className="relative">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-7 text-white/75">{t("body")}</p>
          <div className="mt-8">
            <DonateButtons invert />
          </div>
        </div>
        <div className="mt-14">
          <DonationCategories options={options} locale={locale} />
        </div>
      </Container>
    </Section>
  );
}
