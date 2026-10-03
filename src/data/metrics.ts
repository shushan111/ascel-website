import type { Metric } from "@/types";

/**
 * Counted from what the two programs have actually published: the course
 * programmes on the Gyumri Orthopedic School site (17 courses already held,
 * imported into Sanity) and the ACDCS results for 2024–2025. A "+" marks a
 * figure that is a documented minimum — courses that never published a
 * participant count are not included in it.
 */
const metrics: Metric[] = [
  {
    id: "professionals",
    label: {
      en: "Professionals Trained",
      hy: "Վերապատրաստված մասնագետներ",
      ru: "Подготовленные специалисты",
    },
    // 153 surgeons on ACDCS (2024–2025) + 220 published places on the Gyumri
    // courses that state a participant cap.
    display: "370+",
    numericValue: 370,
  },
  {
    id: "programs",
    label: {
      en: "Educational Programs",
      hy: "Կրթական ծրագրեր",
      ru: "Образовательные программы",
    },
    // 12 clinical directions taught in Gyumri + Damage Control Surgery.
    display: "13",
    numericValue: 13,
  },
  {
    id: "faculty",
    label: {
      en: "International Faculty",
      hy: "Միջազգային դասախոսներ",
      ru: "Международные преподаватели",
    },
    // 23 faculty named in the Gyumri programmes who teach from outside
    // Armenia, plus the French ACDCS faculty.
    display: "25+",
    numericValue: 25,
  },
  {
    id: "sessions",
    label: {
      en: "Courses Held",
      hy: "Անցկացված դասընթացներ",
      ru: "Проведённые курсы",
    },
    // 17 Gyumri courses already held + 18 ACDCS training cycles. Counted as
    // whole courses rather than individual sessions: it is the figure both
    // programs actually publish.
    display: "35",
    numericValue: 35,
  },
];

export function getIntroMetrics() {
  return metrics;
}
