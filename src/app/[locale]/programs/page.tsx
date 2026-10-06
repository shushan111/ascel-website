import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProgramHref, getPrograms } from "@/data/programs";
import { programPhotos } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { cn, loc } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionNav } from "@/components/ui/SectionNav";
import { FactList } from "@/components/ui/FactList";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { PartnerRow } from "@/components/programs/ProgramCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("programsTitle"),
    description: t("programsDescription"),
    path: "/programs",
    locale,
    image: "/images/work/exfix2022-team.webp",
  });
}

/**
 * The programmes as evidence of work: each one a chapter with its photograph,
 * what it does, who it is for and its key facts — all from the programme's
 * own profile. A sticky bar jumps between them; partner organisations follow
 * as quiet rows.
 */
export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProgramsPage");
  const common = await getTranslations("Common");
  const home = await getTranslations("Home");
  const nav = await getTranslations("Nav");
  const programs = await getPrograms();
  const own = programs.filter((program) => program.detail || program.hasOnSiteProfile);
  const partners = programs.filter((program) => !own.includes(program));

  const navItems = [
    ...own.map((program) => ({ id: program.slug, label: loc(program.shortTitle, locale) })),
    ...(partners.length ? [{ id: "partners", label: home("partnerLabel") }] : []),
  ];

  return (
    <>
      <PageHeader breadcrumbs={[{ label: nav("programs") }]} title={t("title")} intro={t("intro")} />
      <SectionNav items={navItems} />

      {own.map((program, index) => {
        const detail = program.detail;
        const href = getProgramHref(program).href;
        const photos = (programPhotos[program.slug] ?? []).slice(0, 3);
        const flip = index % 2 === 1;
        return (
          <Section key={program.id} id={program.slug} tone={index % 2 === 0 ? "paper" : "canvas"}>
            <Container width="wide">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <ImageReveal className={cn("media lg:col-span-7", flip && "lg:order-2")}>
                  <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[3/2]">
                    <Image src={program.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 58vw, 100vw" />
                  </Link>
                </ImageReveal>

                <FadeIn className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <p className="flex items-center gap-3 text-[0.9375rem] text-muted">
                    <span className="font-display tabular-nums text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                    {loc(program.category, locale)}
                  </p>
                  <h2 className="t-h1 mt-4 text-balance text-ink">
                    <Link href={href} className="transition-colors duration-200 hover:text-accent-ink">
                      {loc(program.title, locale)}
                    </Link>
                  </h2>
                  <p className="t-body mt-4 text-muted">
                    {loc(detail ? detail.tagline : program.description, locale)}
                  </p>
                  {detail?.facts.length ? (
                    <FactList
                      variant="plain"
                      className="mt-6 border-y border-line"
                      facts={detail.facts.map((fact) => ({ label: loc(fact.label, locale), value: loc(fact.value, locale) }))}
                    />
                  ) : null}
                  <Link href={href} className={buttonClassName("primary", "mt-7")}>
                    {common("learnMore")}
                    <ArrowRightIcon className="btn-arrow" />
                  </Link>
                </FadeIn>
              </div>

              {detail ? (
                <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:gap-6">
                  {[
                    { title: t("whatItDoes"), items: detail.education.formats.slice(0, 5).map((format) => loc(format.title, locale)) },
                    { title: loc(detail.audience.title, locale), items: detail.audience.groups.slice(0, 5).map((group) => loc(group.title, locale)) },
                  ].map((list) => (
                    <FadeIn key={list.title} className={cn("card h-full p-6 sm:p-7", index % 2 === 0 && "bg-canvas")}>
                      <h3 className="t-h4 text-ink">{list.title}</h3>
                      <ul className="mt-4 space-y-2.5">
                        {list.items.map((item, i) => (
                          <li key={i} className="flex gap-3 text-[1rem] leading-snug text-body">
                            <CheckIcon className="mt-0.5 text-accent-ink" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </FadeIn>
                  ))}
                </div>
              ) : null}

              {photos.length ? (
                <div className="mt-4 grid grid-cols-3 gap-2 md:gap-4 lg:mt-6">
                  {photos.map((photo) => (
                    <ImageReveal key={photo.src} className="media">
                      <div className="relative aspect-[4/3]">
                        <Image src={photo.src} alt="" fill className="object-cover" sizes="(min-width: 768px) 30vw, 33vw" />
                      </div>
                    </ImageReveal>
                  ))}
                </div>
              ) : null}
            </Container>
          </Section>
        );
      })}

      {partners.length ? (
        <Section id="partners" tone={own.length % 2 === 0 ? "paper" : "canvas"} space="compact">
          <Container width="wide" className="space-y-4">
            {partners.map((program) => (
              <PartnerRow key={program.id} program={program} locale={locale} />
            ))}
          </Container>
        </Section>
      ) : null}
    </>
  );
}
