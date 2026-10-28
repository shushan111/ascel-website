import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Institutions the courses are run with. Logos differ wildly in shape (a
 * square mark, a wide wordmark), so each is fitted to one height and the
 * organisation's name is set underneath in the site's own type.
 * An entry without `url` renders without a link rather than with a guessed one.
 */
const educationalPartners = [
  { id: "amadea", logo: "/images/partners/amadea.png", width: 573, height: 480 },
  { id: "nih", logo: "/images/partners/nih-armenia.png", width: 379, height: 70, url: "https://nih.am" },
] as const;

export async function EducationalPartners() {
  const t = await getTranslations("EducationalPartners");

  return (
    <Section>
      <Container width="wide">
        <SectionHeader title={t("title")} />
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-14 lg:max-w-4xl">
          {educationalPartners.map((partner, index) => {
            const name = t(`${partner.id}.name`);
            const tileClass = "group flex flex-col items-start gap-4";
            const content = (
              <>
                {/* With a mouse: grey at rest, its own colour on hover. Touch
                    screens have no hover, so there the logo is always in
                    colour. Keyboard focus behaves the same everywhere. The
                    filters are `!` because the global `img { filter }` rule
                    sits outside Tailwind's layers and would otherwise win. */}
                <Image
                  src={partner.logo}
                  alt={name}
                  width={partner.width}
                  height={partner.height}
                  className={cn(
                    "h-20 w-auto max-w-full origin-left object-contain",
                    "transition-[filter,scale] duration-[280ms] ease-(--ease-out-soft)",
                    "[@media(hover:hover)_and_(pointer:fine)]:grayscale!",
                    "[@media(hover:hover)_and_(pointer:fine)]:motion-safe:group-hover:scale-[1.04]",
                    "[@media(hover:hover)_and_(pointer:fine)]:group-hover:grayscale-0!",
                    "motion-safe:group-focus-visible:scale-[1.04] group-focus-visible:grayscale-0!",
                    "motion-reduce:transition-none",
                  )}
                />
                <span className="t-small text-muted">{name}</span>
              </>
            );
            return (
              <li key={partner.id}>
                <FadeIn delay={index * 0.1}>
                  {"url" in partner ? (
                    <a href={partner.url} target="_blank" rel="noopener" className={tileClass}>
                      {content}
                    </a>
                  ) : (
                    <div className={tileClass}>{content}</div>
                  )}
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
