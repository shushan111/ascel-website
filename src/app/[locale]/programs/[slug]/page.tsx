import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getProgramBySlug, getPrograms } from "@/data/programs";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { ProgramDetail } from "@/components/programs/ProgramDetail";

export function generateStaticParams() {
  return getPrograms().map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  const description = program.detail?.seoDescription ?? program.description;
  return buildMetadata({
    title: `${loc(program.title, locale)} | ASCEL`,
    description: loc(description, locale),
    path: `/programs/${program.slug}`,
    locale,
    image: program.image,
  });
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  return <ProgramDetail program={program} locale={locale} />;
}
