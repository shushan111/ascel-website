import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Program } from "@/types";
import { cn, loc } from "@/lib/utils";
import { getProgramHref } from "@/data/programs";
import { ArrowRightIcon, ExternalIcon } from "@/components/ui/icons";

/**
 * One of the organisation's own programmes: photograph, category, title, the
 * one-paragraph description and the way in. The whole card is the link.
 */
export async function ProgramCard({
  program,
  locale,
  className,
}: {
  program: Program;
  locale: string;
  className?: string;
}) {
  const t = await getTranslations("Common");
  const target = getProgramHref(program);
  const title = loc(program.title, locale);
  const label = t(program.ctaLabel);

  const linkProps = target.external
    ? { href: target.href, target: "_blank", rel: "noopener noreferrer" }
    : null;

  return (
    <article className={cn("card card-link group flex h-full flex-col overflow-hidden", className)}>
      <div className="media-zoom relative aspect-[16/10] overflow-hidden bg-mist">
        <Image
          src={program.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="t-label text-accent-ink">{loc(program.category, locale)}</p>
        <h3 className="t-h2 mt-3 text-balance text-ink">
          {linkProps ? (
            <a {...linkProps} className="after:absolute after:inset-0">
              {title}
            </a>
          ) : (
            <Link href={target.href} className="after:absolute after:inset-0">
              {title}
            </Link>
          )}
        </h3>
        <p className="t-body mt-4 text-muted">{loc(program.description, locale)}</p>
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.96875rem] font-medium text-ink transition-colors group-hover:text-accent-ink"
        >
          {label}
          {target.external ? (
            <ExternalIcon className="h-3.5 w-3.5" />
          ) : (
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          )}
        </span>
        {target.external ? <span className="sr-only">{t("externalLink")}</span> : null}
      </div>
    </article>
  );
}

/** A related organisation: a quiet row, not a card of equal weight. */
export async function PartnerRow({ program, locale }: { program: Program; locale: string }) {
  const t = await getTranslations("Common");
  const home = await getTranslations("Home");
  const target = getProgramHref(program);

  return (
    <div className="card flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:gap-8">
      <div className="min-w-0 flex-1">
        <p className="t-label text-muted">{home("partnerLabel")}</p>
        <h3 className="t-h4 mt-1.5 text-ink">{loc(program.title, locale)}</h3>
        <p className="t-small mt-1.5 max-w-2xl text-muted">{loc(program.description, locale)}</p>
      </div>
      {target.external ? (
        <a
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[0.96875rem] font-medium text-ink transition-colors hover:text-accent-ink"
        >
          <span className="link-underline">{t(program.ctaLabel)}</span>
          <ExternalIcon className="h-3.5 w-3.5" />
          <span className="sr-only">{t("externalLink")}</span>
        </a>
      ) : (
        <Link
          href={target.href}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[0.96875rem] font-medium text-ink transition-colors hover:text-accent-ink"
        >
          <span className="link-underline">{t(program.ctaLabel)}</span>
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
