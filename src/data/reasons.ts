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
      hy: "2024–2025 թթ. Damage Control վիրաբուժության ծրագրով վերապատրաստվել է 153 վիրաբույժ։ Կրիտիկական իրավիճակներում յուրաքանչյուր որոշում կարող է կյանք փրկել, իսկ անհրաժեշտ գիտելիքն ու պատրաստվածությունը պետք է ունենալ նախապես։",
      en: "In 2024–2025, 153 surgeons were trained through the Damage Control Surgery programme. In critical situations, every decision can save a life, and the knowledge and preparation it takes must be in place beforehand.",
      ru: "В 2024–2025 годах по программе Damage Control Surgery подготовлены 153 хирурга. В критических ситуациях каждое решение может спасти жизнь, а необходимые знания и подготовку нужно иметь заранее.",
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
      hy: "Մասնագիտական կրթություն՝ հենց մարզում",
      en: "Professional training, right in the region",
      ru: "Профессиональное обучение прямо в регионе",
    },
    body: {
      hy: "2019 թվականից դասընթացներն անցկացվում են Գյումրիում՝ մասնագիտական վերապատրաստումը հասանելի դարձնելով մարզի բժիշկներին հենց տեղում։ Այս ձևաչափը հնարավորություն է տալիս զարգացնել մասնագիտական հմտությունները՝ առանց աշխատանքից երկարատև կտրվելու կամ Երևան մեկնելու անհրաժեշտության։",
      en: "Since 2019, the courses have been held in Gyumri, bringing professional training to doctors in the region right where they work. This format lets them build their professional skills without long breaks from work or the need to travel to Yerevan.",
      ru: "С 2019 года курсы проходят в Гюмри, делая профессиональную подготовку доступной для врачей региона прямо на месте. Такой формат позволяет развивать профессиональные навыки без длительного отрыва от работы и без необходимости ехать в Ереван.",
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
      hy: "Ուժեղ վիրաբուժությունը սկսվում է պատրաստված թիմից",
      en: "Strong surgery starts with a trained team",
      ru: "Сильная хирургия начинается с подготовленной команды",
    },
    body: {
      hy: "2019–2026 թթ. Վիրահատարանի բուժքույրերի դպրոցն անցկացվել է վեց անգամ։ Ծրագիրը զարգացնում է ոչ միայն առանձին մասնագետների, այլև ամբողջ վիրաբուժական թիմի գիտելիքներն ու գործնական հմտությունները։",
      en: "In 2019–2026, the Operating Room Nurses School was held six times. The programme builds the knowledge and practical skills not only of individual specialists but of the whole surgical team.",
      ru: "В 2019–2026 годах Школа операционных медсестёр была проведена шесть раз. Программа развивает знания и практические навыки не только отдельных специалистов, но и всей хирургической команды.",
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
