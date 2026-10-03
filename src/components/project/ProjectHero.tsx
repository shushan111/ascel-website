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
      {/* A legibility scrim, not a decorative gradient. */}
      <div className="absolute inset-0 bg-ink/64" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/70 via-ink/30 to-transparent" />
      <Container className="relative py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="t-eyebrow text-accent-light">
            {loc(projectMeta.addressLine, locale)} · {t("eyebrowStage")}
          </p>
          <h1 className="t-display mt-5 text-balance text-on-dark">
            {t("headline")}
          </h1>
          <p className="t-lead mt-6 max-w-xl text-on-dark/85">
            {t("supporting")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
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
          <p className="mt-7 max-w-md text-xs leading-5 text-on-dark/60">
            {t("credit", { architects: loc(projectMeta.architects, locale) })}
          </p>
        </div>
      </Container>
    </section>
  );
}
