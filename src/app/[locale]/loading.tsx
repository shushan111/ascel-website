import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

/**
 * Shown while a page that is not prerendered waits on the CMS: the shape of a
 * page header and a row of cards, so the layout does not jump when the
 * content arrives.
 */
export default async function Loading() {
  const t = await getTranslations("Common");

  return (
    <div role="status" aria-live="polite" className="bg-canvas pb-20 pt-6 md:pb-band">
      <span className="sr-only">{t("loading")}</span>
      <div aria-hidden="true">
        <Container width="wide">
          <div className="skeleton h-4 w-40" />
          <div className="mt-10 max-w-3xl space-y-3 md:mt-14">
            <div className="skeleton h-10 w-4/5 md:h-12" />
            <div className="skeleton h-10 w-3/5 md:h-12" />
          </div>
          <div className="mt-6 max-w-xl space-y-2.5">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-11/12" />
            <div className="skeleton h-4 w-2/3" />
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <div key={key} className="card overflow-hidden">
                <div className="skeleton aspect-[3/2] rounded-none" />
                <div className="space-y-2.5 p-5">
                  <div className="skeleton h-3.5 w-24" />
                  <div className="skeleton h-5 w-4/5" />
                  <div className="skeleton h-5 w-3/5" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
