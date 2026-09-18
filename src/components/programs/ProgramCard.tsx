import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Program } from "@/types";
import { loc } from "@/lib/utils";
import { getProgramHref } from "@/data/programs";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { FadeIn } from "@/components/motion/FadeIn";

export async function ProgramCard({
  program,
  locale,
  index = 0,
}: {
  program: Program;
  locale: string;
  index?: number;
}) {
  const t = await getTranslations("Common");
  const cta = getProgramHref(program);
  const label = t(program.ctaLabel);

  return (
    <FadeIn delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper transition-colors duration-300 hover:border-ink">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <Image
            src={program.image}
            alt={loc(program.title, locale)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className="t-meta-sm text-accent">{loc(program.category, locale)}</p>
          <h3 className="t-h3 mt-3 text-balance text-ink">
            {loc(program.title, locale)}
          </h3>
          <p className="t-small mt-3 flex-1 text-muted">
            {loc(program.description, locale)}
          </p>
          <div className="mt-7">
            {cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName("secondary")}
              >
                {label}
                <ExternalIcon />
                <span className="sr-only">{t("externalLink")}</span>
              </a>
            ) : (
              <Link href={cta.href} className={buttonClassName("secondary")}>
                {label}
              </Link>
            )}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
