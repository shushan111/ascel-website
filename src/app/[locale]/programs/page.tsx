import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProgramHref, getPrograms } from "@/data/programs";
import { programPhotos } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { cn, loc } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

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
 * own profile. Partner organisations follow as quiet rows.
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
  const programs = await getPrograms();
  const own = programs.filter((program) => program.detail || program.hasOnSiteProfile);
  const partners = programs.filter((program) => !own.includes(program));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      {own.map((program, index) => {
        const detail = program.detail;
        const href = getProgramHref(program).href;
        const photos = (programPhotos[program.slug] ?? []).slice(0, 3);
        return (
          <section
            key={program.id}
            className={cn("py-20 md:py-28", index % 2 === 0 ? "bg-paper" : "bg-canvas")}
          >
            <Container width="wide">
              <p className="flex items-baseline gap-4 border-t border-ink/70 pt-4 text-[0.95rem] text-muted">
                <span className="tabular-nums text-ink">{String(index + 1).padStart(2, "0")}</span>
                <span>{loc(program.category, locale)}</span>
              </p>

              <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
                <ImageReveal className={cn("lg:col-span-7", index % 2 === 1 && "lg:order-2 lg:col-start-6")}>
                  <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[3/2] bg-mist">
                    <Image
                      src={program.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  </Link>
                </ImageReveal>

                <FadeIn className={cn("lg:col-span-5", index % 2 === 1 ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:col-start-8")}>
                  <h2 className="t-h1 text-balance text-ink">
                    <Link href={href} className="transition-colors duration-300 hover:text-accent-ink">
                      {loc(program.title, locale)}
                    </Link>
                  </h2>
                  <p className="t-body mt-5 text-body">
                    {loc(detail ? detail.tagline : program.description, locale)}
                  </p>
                  {detail?.facts.length ? (
                    <dl className="mt-8 border-t border-line">
                      {detail.facts.map((fact, factIndex) => (
                        <div key={factIndex} className="flex justify-between gap-6 border-b border-line py-3">
                          <dt className="text-[0.92rem] text-muted">{loc(fact.label, locale)}</dt>
                          <dd className="text-right text-[0.95rem] text-ink">{loc(fact.value, locale)}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </FadeIn>
              </div>

              {detail ? (
                <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <h3 className="text-[0.95rem] text-muted">{t("whatItDoes")}</h3>
                    <ul className="mt-4 space-y-2">
                      {detail.education.formats.slice(0, 5).map((format, i) => (
                        <li key={i} className="text-[1.02rem] leading-snug text-ink">{loc(format.title, locale)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-[0.95rem] text-muted">{loc(detail.audience.title, locale)}</h3>
                    <ul className="mt-4 space-y-2">
                      {detail.audience.groups.slice(0, 5).map((group, i) => (
                        <li key={i} className="text-[1.02rem] leading-snug text-ink">{loc(group.title, locale)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2 lg:col-span-4 lg:self-end lg:text-right">
                    <Link
                      href={href}
                      className="group inline-flex min-h-11 items-center gap-2 border-b border-ink/30 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:border-ink"
                    >
                      {common("learnMore")}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              ) : null}

              {photos.length ? (
                <div className="mt-14 grid grid-cols-3 gap-3 md:gap-6">
                  {photos.map((photo) => (
                    <div key={photo.src} className="relative aspect-[4/3] bg-mist">
                      <Image src={photo.src} alt="" fill className="object-cover" sizes="(min-width: 768px) 30vw, 33vw" />
                    </div>
                  ))}
                </div>
              ) : null}
            </Container>
          </section>
        );
      })}

      {partners.length ? (
        <section className="bg-paper py-20 md:py-24">
          <Container width="wide">
            <ul className="border-t border-line">
              {partners.map((program) => {
                const target = getProgramHref(program);
                return (
                  <li key={program.id} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-10">
                    <p className="t-small text-muted md:col-span-3">{home("partnerLabel")}</p>
                    <div className="md:col-span-6">
                      <h2 className="t-h3 text-ink">{loc(program.title, locale)}</h2>
                      <p className="t-small mt-3 max-w-xl text-muted">{loc(program.description, locale)}</p>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                      {target.external ? (
                        <a href={target.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border-b border-ink/30 text-[0.95rem] font-medium text-ink hover:border-ink">
                          {common(program.ctaLabel)}
                          <ExternalIcon />
                          <span className="sr-only">{common("externalLink")}</span>
                        </a>
                      ) : (
                        <Link href={target.href} className="inline-flex min-h-11 items-center gap-2 border-b border-ink/30 text-[0.95rem] font-medium text-ink hover:border-ink">
                          {common(program.ctaLabel)} →
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
