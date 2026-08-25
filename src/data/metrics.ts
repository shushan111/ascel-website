import type { Metric } from "@/types";

const metrics: Metric[] = [
  {
    id: "professionals",
    label: {
      en: "Professionals Trained",
      hy: "Վերապատրաստված մասնագետներ",
      ru: "Подготовленные специалисты",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "programs",
    label: {
      en: "Educational Programs",
      hy: "Կրթական ծրագրեր",
      ru: "Образовательные программы",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "faculty",
    label: {
      en: "International Faculty",
      hy: "Միջազգային դասախոսներ",
      ru: "Международные преподаватели",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "sessions",
    label: {
      en: "Training Sessions",
      hy: "Ուսուցման պարապմունքներ",
      ru: "Учебные занятия",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "courses",
    label: {
      en: "Courses Delivered",
      hy: "Անցկացված դասընթացներ",
      ru: "Проведённые курсы",
    },
    display: "XX+",
    numericValue: null,
  },
  {
    id: "institutions",
    label: {
      en: "Partner Institutions",
      hy: "Գործընկեր հաստատություններ",
      ru: "Партнёрские учреждения",
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
