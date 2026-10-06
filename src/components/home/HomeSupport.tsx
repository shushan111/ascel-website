import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getDonationOptions } from "@/data/donation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DonateButtons } from "@/components/donate/DonateButtons";
import { DonationCategories } from "@/components/donate/DonationCategories";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * The ask, at the point the story has earned it: a dark band that says
 * exactly what a gift builds — six parts of the building, in build order —
 * with the courtyard a donor will one day walk into beside it.
 */
export async function HomeSupport({ locale }: { locale: string }) {
  const t = await getTranslations("DonateHome");
  const home = await getTranslations("Home");
  const options = getDonationOptions();

  return (
    <Section id="support" tone="ink">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <FadeIn className="lg:col-span-5">
          <p className="t-eyebrow text-accent-light">{home("supportEyebrow")}</p>
          <h2 className="t-h1 mt-5 text-balance text-on-dark">{t("categoriesTitle")}</h2>
          <p className="t-lead mt-5 text-on-dark/75">{t("body")}</p>
          <p className="t-small mt-3 text-on-dark/55">{t("bodySecond")}</p>
          <div className="mt-8">
            <DonateButtons invert />
          </div>
          <ImageReveal className="media mt-10 hidden lg:block">
            <div className="relative aspect-[4/3]">
              <Image src="/images/project/courtyard.webp" alt="" fill sizes="40vw" className="object-cover" />
            </div>
          </ImageReveal>
        </FadeIn>
        <div className="lg:col-span-7">
          <DonationCategories options={options} locale={locale} invert columns={2} />
        </div>
      </Container>
    </Section>
  );
}
