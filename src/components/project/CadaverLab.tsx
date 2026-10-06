import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { InfoIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Why the basement exists — the part of the brief a visitor is least likely
 * to already understand.
 */
export async function CadaverLab() {
  const t = await getTranslations("CadaverLab");

  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <ImageReveal className="media lg:col-span-5">
        <div className="relative aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src="/images/project/new-volume.webp"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </ImageReveal>
      <FadeIn className="lg:col-span-6 lg:col-start-7">
        <p className="t-label text-accent-ink">{t("eyebrow")}</p>
        <h3 className="t-h1 mt-3 text-balance text-ink">{t("title")}</h3>
        <p className="t-lead mt-6 text-body">{t("body")}</p>
        <p className="t-body mt-4 text-muted">{t("bodySecond")}</p>
        <p className="t-small mt-7 flex gap-3 rounded-sm border border-line bg-paper p-4 text-muted">
          <InfoIcon className="mt-1 text-accent-ink" />
          {t("note")}
        </p>
      </FadeIn>
    </div>
  );
}
