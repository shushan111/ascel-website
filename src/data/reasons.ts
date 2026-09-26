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
 * The third reason argues from the others rather than citing a statistic,
 * because no brain-drain figure exists anywhere in this project — if the
 * client has one, it belongs here.
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
      hy: "Ծանր վնասվածքը սպասում չի տալիս",
      en: "Severe trauma does not wait",
      ru: "Тяжёлая травма не ждёт",
    },
    body: {
      hy: "Damage Control վիրաբուժության ծրագրով 2024–2025 թթ. վերապատրաստվել է 153 վիրաբույժ։ Այս հմտությունը սովորում են նախապես՝ ոչ թե այն օրը, երբ այն պետք է գա։",
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
      hy: "2019 թվականից ի վեր դասընթացներն անցկացվում են Գյումրիում, ոչ թե Երևանում։ Բժիշկը վերապատրաստվում է առանց իր հիվանդանոցը լքելու և մնում է այնտեղ, որտեղ իրեն սպասում են։",
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
    id: "retention",
    title: {
      hy: "Պատրաստությունը պահում է մասնագետին",
      en: "Training is what keeps a specialist",
      ru: "Подготовка удерживает специалиста",
    },
    body: {
      hy: "Երբ առաջադեմ վերապատրաստումը հասանելի չէ տեղում, մասնագետը գնում է այնտեղ, որտեղ այն կա։ Կենտրոնը կառուցվում է, որպեսզի այդ պատրաստությունը լինի Հայաստանում։",
      en: "When advanced training is not available at home, specialists go where it is. The center is being built so that this training exists in Armenia.",
      ru: "Когда продвинутая подготовка недоступна дома, специалист уезжает туда, где она есть. Центр строится, чтобы такая подготовка была в Армении.",
    },
    figure: null,
    figureLabel: null,
  },
];

export function getReasons(): Reason[] {
  return reasons;
}
