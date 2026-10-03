import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { Container } from "@/components/ui/Container";
import { DonateButtons } from "@/components/donate/DonateButtons";
import { DonationCategories } from "@/components/donate/DonationCategories";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * The ask, at the point the story has earned it. A dark, full-bleed band so it
 * reads as a distinct moment, with the courtyard — the part of the building a
 * donor will one day walk into — beside the text rather than dimmed behind it.
 */
export async function HomeSupport({ locale }: { locale: string }) {
  const t = await getTranslations("DonateHome");
  const home = await getTranslations("Home");
  const options = getDonationOptions();

  return (
    <section id="support" className="bg-night text-on-dark">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[40rem]">
          <Image
            src="/images/project/courtyard.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-5 py-20 sm:px-6 md:px-12 md:py-28 lg:px-16 xl:px-24">
          <FadeIn className="max-w-xl">
            <p className="t-eyebrow text-accent-light">{home("supportEyebrow")}</p>
            <h2 className="t-h1 mt-6 text-balance text-on-dark">{t("title")}</h2>
            <p className="t-lead mt-7 text-on-dark/80">{t("body")}</p>
            <p className="t-body mt-4 text-on-dark/65">{t("bodySecond")}</p>
            <div className="mt-10">
              <DonateButtons invert />
            </div>
          </FadeIn>
        </div>
      </div>
      <Container width="wide" className="py-20 md:py-24">
        <DonationCategories options={options} locale={locale} invert />
      </Container>
    </section>
  );
}
