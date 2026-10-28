import { getTranslations } from "next-intl/server";
import type { Founder } from "@/types";
import { loc } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { FounderPortrait } from "@/components/founders/FounderPortrait";
import { founderName } from "@/components/founders/founderName";

/**
 * One founder as an editorial entry rather than a team card: number, portrait,
 * name and post on a hairline, then the short biography. The longer one, when
 * the Studio has it, opens in place with a native <details>.
 */
export async function FounderProfile({
  founder,
  locale,
  index,
  id,
}: {
  founder: Founder;
  locale: string;
  index: number;
  id: string;
}) {
  const t = await getTranslations("FoundersPage");
  const name = founderName(founder, locale);
  const role = founder.role ? loc(founder.role, locale) : "";
  const bio = founder.bio ? loc(founder.bio, locale) : "";
  const extended = founder.bioExtended ? loc(founder.bioExtended, locale) : "";
  const alt = (founder.photoAlt && loc(founder.photoAlt, locale)) || name;

  return (
    <article id={id} aria-labelledby={`${id}-name`} className="group scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-line pt-8 md:pt-10">
      <FadeIn className="grid gap-6 sm:grid-cols-12 sm:gap-8 lg:gap-10">
        <div className="sm:col-span-4 lg:col-span-3">
          <FounderPortrait
            src={founder.photo}
            alt={alt}
            name={name}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
            priority={index === 0}
            className="w-44 sm:w-auto sm:max-w-[20rem]"
          />
          {founder.photoCredit ? (
            <p className="t-caption mt-2 text-muted">{t("photoBy", { credit: founder.photoCredit })}</p>
          ) : null}
        </div>
        <div className="sm:col-span-8 lg:col-span-8 lg:col-start-5">
          <p className="font-display text-[0.9375rem] tabular-nums text-accent-ink">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 id={`${id}-name`} className="t-h2 mt-3 text-balance text-ink">
            {name}
          </h2>
          {role ? <p className="t-label mt-3 text-muted">{role}</p> : null}
          {bio ? <p className="t-body mt-6 max-w-(--measure) text-body">{bio}</p> : null}
          {extended ? (
            <details className="group/details mt-5 max-w-(--measure)">
              <summary className="t-label inline-flex cursor-pointer list-none items-center gap-2 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink [&::-webkit-details-marker]:hidden">
                <span className="group-open/details:hidden">{t("readMore")}</span>
                <span className="hidden group-open/details:inline">{t("readLess")}</span>
              </summary>
              <p className="t-body mt-4 text-body">{extended}</p>
            </details>
          ) : null}
        </div>
      </FadeIn>
    </article>
  );
}
