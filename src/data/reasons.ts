import type { LocalizedString } from "@/types";

/**
 * Why this building, in this town, now. Three arguments a donor can hold in
 * their head, placed directly under the hero.
 *
 * DRAFT — պատվիրատուի հաստատման կարիք ունի.
 * Every claim below is drawn from material already on this site: the Damage
 * Control (ACDCS) programme and its 2024–2025 figure from src/data/metrics.ts,
 * the Gyumri course history in data/gos/, and the regional-hub framing in
 * AboutPage.whoBody / visionBody. No new fact, number or name is introduced.
 * The third reason was an argument about specialists leaving, with no figure
 * behind it. It is now the operating room nurses school — six editions in
 * data/gos/ — which makes a point that is just as strong and is evidenced.
 */
export interface Reason {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
  /** Shown as a small mark beside the reason. Null when there is no figure. */
  figure: string | null;
  figureLabel: LocalizedString | null;
}

export const reasons: Reason[] = [
  {
    id: "damage-control",
    title: {
      hy: "Ծանր վնասվածքը չի սպասում",
      en: "Severe trauma does not wait",
      ru: "Тяжёлая травма не ждёт",
    },
    body: {
      hy: "Damage Control վիրաբուժության ծրագրով 2024–2025 թթ. վերապատրաստվել է 153 վիրաբույժ։ Այս հմտությանը տիրապետում են նախապես, ոչ թե այն օրը, երբ այն անհրաժեշտ է դառնում։",
      en: "The Damage Control Surgery programme trained 153 surgeons in 2024–2025. This is a skill you learn beforehand, not on the day it is needed.",
      ru: "По программе Damage Control Surgery в 2024–2025 годах подготовлены 153 хирурга. Этому учатся заранее, а не в тот день, когда это понадобится.",
    },
    figure: "153",
    figureLabel: {
      hy: "վիրաբույժ, 2024–2025",
      en: "surgeons, 2024–2025",
      ru: "хирурга, 2024–2025",
    },
  },
  {
    id: "regional",
    title: {
      hy: "Մարզի բժիշկը սովորում է տեղում",
      en: "Regional doctors train where they work",
      ru: "Врач региона учится на месте",
    },
    body: {
      hy: "2019 թվականից ի վեր դասընթացներն անցկացվում են Գյումրիում, ոչ թե Երևանում։ Բժիշկը վերապատրաստվում է՝ առանց երկար ժամանակով հեռանալու իր հիվանդանոցից, և մնում է այնտեղ, որտեղ իրեն սպասում են։",
      en: "Since 2019 the courses have been held in Gyumri, not in Yerevan. A doctor trains without leaving their hospital, and stays where they are needed.",
      ru: "С 2019 года курсы проходят в Гюмри, а не в Ереване. Врач учится, не покидая свою больницу, и остаётся там, где он нужен.",
    },
    figure: "2019",
    figureLabel: {
      hy: "առաջին դասընթացից",
      en: "since the first course",
      ru: "с первого курса",
    },
  },
  {
    id: "whole-team",
    title: {
      hy: "Վիրահատությունը թիմային աշխատանք է",
      en: "Surgery is teamwork",
      ru: "Операция — командная работа",
    },
    body: {
      hy: "Վիրահատարանի բուժքույրերի դպրոցն անցկացվել է վեց անգամ՝ 2019-ից 2026 թթ.։ Վիրաբույժը մենակ չի վիրահատում, և կենտրոնը պատրաստում է ամբողջ թիմը՝ ոչ միայն բժշկին։",
      en: "The operating room nurses school has run six times between 2019 and 2026. A surgeon does not operate alone, and the center trains the whole team, not only the doctor.",
      ru: "Школа операционных сестёр проведена шесть раз с 2019 по 2026 год. Хирург не оперирует один, и центр готовит всю команду, а не только врача.",
    },
    figure: "6",
    figureLabel: {
      hy: "անգամ, 2019–2026",
      en: "times, 2019–2026",
      ru: "раза, 2019–2026",
    },
  },
];

export function getReasons(): Reason[] {
  return reasons;
}
