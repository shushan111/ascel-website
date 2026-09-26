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
          <p className="t-eyebrow text-accent-light">
            {loc(projectMeta.addressLine, locale)} · {t("eyebrowStage")}
          </p>
          <h1 className="t-display mt-6 text-balance text-on-dark">
            {t("headline")}
          </h1>
          {/* Was `t-lead max-w-xl`: five sentences at 20.8px in a 576px
              column ran to nine lines on desktop and thirteen at 375. A hero
              paragraph this long is body copy, not a lead, so it takes the
              body size and a wider column — ~62 characters, near the 66 that
              --measure sets. The local cap folds into Container later. */}
          <p className="t-body mt-7 max-w-[38rem] text-on-dark/85">
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
