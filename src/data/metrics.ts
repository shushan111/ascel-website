import type { Metric } from "@/types";

const metrics: Metric[] = [
  {
    id: "professionals",
    label: {
      en: "Professionals Trained",
      hy: "Վերապատրաստված մասնագետներ",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "programs",
    label: {
      en: "Educational Programs",
      hy: "Կրթական ծրագրեր",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "faculty",
    label: {
      en: "International Faculty",
      hy: "Միջազգային դասախոսներ",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "sessions",
    label: {
      en: "Training Sessions",
      hy: "Ուսուցման պարապմունքներ",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "courses",
    label: {
      en: "Courses Delivered",
      hy: "Անցկացված դասընթացներ",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "institutions",
    label: {
      en: "Partner Institutions",
      hy: "Գործընկեր հաստատություններ",
    },
    display: "XX+",
    numericValue: null,
  },
];

export function getIntroMetrics() {
  return metrics.slice(0, 4);
}

export function getImpactMetrics() {
  return metrics;
}
