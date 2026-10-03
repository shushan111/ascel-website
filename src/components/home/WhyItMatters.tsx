import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { workPhotos } from "@/data/work";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImpactChain } from "@/components/impact/ImpactChain";
import { Reasons } from "@/components/impact/Reasons";

/**
 * Why a donation to a building is a donation to care: the chain from walls to
 * patients, then the three reasons with their published figures.
 */
export async function WhyItMatters({ locale }: { locale: string }) {
  const t = await getTranslations("Home");

  return (
    <section className="bg-paper py-24 md:py-band">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <p className="t-eyebrow text-muted">{t("mattersEyebrow")}</p>
            <h2 className="t-h1 mt-5 text-balance text-ink">{t("mattersTitle")}</h2>
          </FadeIn>
          <div className="relative hidden aspect-[3/2] lg:col-span-6 lg:col-start-7 lg:block">
            <Image
              src={workPhotos.exfixFootModel.src}
              alt=""
              fill
              sizes="45vw"
              className="object-cover"
            />
          </div>
        </div>

        <ImpactChain className="mt-16 md:mt-24" />
        <Reasons locale={locale} className="mt-20 border-t border-line pt-14 md:mt-28" />
      </Container>
    </section>
  );
}
