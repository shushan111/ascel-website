import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

const areaKeys = [
  "medicalSimulation",
  "surgicalTraining",
  "emergencyScenarios",
  "teamTraining",
  "proceduralSkills",
  "experimentalLearning",
] as const;

export async function SimulationPreview() {
  const t = await getTranslations("SimulationHome");

  return (
    <Section>
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ImageReveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-mist lg:aspect-[4/3]">
            <Image
              src="/images/simulation-center.webp"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </ImageReveal>
        <FadeIn>
          <h2 className="t-h2 text-balance text-ink">{t("title")}</h2>
          <p className="t-body mt-5 text-muted">{t("body")}</p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
            {areaKeys.map((key) => (
              <li
                key={key}
                className="border-t border-line py-3.5 text-sm leading-6 text-ink"
              >
                {t(key)}
              </li>
            ))}
          </ul>
          <Link
            href="/simulation-center"
            className={buttonClassName("primary", "mt-9")}
          >
            {t("cta")}
          </Link>
        </FadeIn>
      </Container>
    </Section>
  );
}
