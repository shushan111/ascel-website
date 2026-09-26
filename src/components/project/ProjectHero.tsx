import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectMeta } from "@/data/project";
import { loc } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

/**
 * The first screen is the project: the restored monument on Myasnikyan
 * Street, what it is becoming, and the one action the site exists for.
 * The old hero led with the institution and buried donating in a secondary
 * link — here donating is the filled button.
 */
export async function ProjectHero({ locale }: { locale: string }) {
  const t = await getTranslations("ProjectHero");

  return (
    <section className="relative flex min-h-[34rem] items-end overflow-hidden bg-ink md:min-h-[40rem] md:items-center lg:min-h-[44rem]">
      <Image
        src="/images/project/facade-after.webp"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* A legibility scrim, not a decorative gradient. The flat layer was
          ink/64 under a gradient that reached ink/70 on the left, which put
          the facade behind roughly 0.9 of solid ink — the photograph was
          doing no work. The flat layer drops and the gradient carries the
          contrast where the text actually sits. */}
      <div className="absolute inset-0 bg-ink/58 lg:bg-ink/45" />
      {/* The horizontal gradient only works once the text column is a
          fraction of the width — at 768 it still spans most of it, so lines
          end over bare photograph. Below lg the scrim runs bottom-up under
          the text block instead. */}
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/40 to-ink/10 lg:bg-linear-to-r lg:from-ink/75 lg:via-ink/35 lg:to-ink/5" />
      <Container className="relative py-20 md:py-24">
        <div className="max-w-2xl">
          {/* The address only. "Sketch design · 2026" told a donor the plan
              is not final yet, which is not what this screen is for. */}
          <p className="t-eyebrow text-accent-light">
            {loc(projectMeta.addressLine, locale)}
          </p>
          <h1 className="t-display mt-6 text-balance text-on-dark">
            {t("headline")}
          </h1>
          {/* DRAFT — պատվիրատուի հաստատման կարիք ունի (supporting, CTAs).
              Two sentences, not five: what is being built and how it is paid
              for. The condition of the roof, the blocked windows and the
              build sequence belong to the building section further down. */}
          <p className="t-lead mt-7 max-w-(--measure) text-on-dark/85">
            {t("supporting")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <Link href="/donate" className={buttonClassName("onDark")}>
              {t("primaryCta")}
            </Link>
            <Link
              href="/simulation-center"
              className={buttonClassName(
                "secondary",
                "border-on-dark/45 text-on-dark hover:border-on-dark hover:bg-on-dark/12 hover:text-on-dark",
              )}
            >
              {t("secondaryCta")}
            </Link>
          </div>
          <p className="mt-8 max-w-md text-[0.85rem] leading-6 text-on-dark/65">
            {t("credit", { architects: loc(projectMeta.architects, locale) })}
          </p>
        </div>
      </Container>
    </section>
  );
}
