import type { DonationOption } from "@/types";

/**
 * Support is directed at the building, not at abstractions: each option maps
 * to a part of the sketch design for the Medical Training Center at
 * Myasnikyan 20-22, so a donor can see what their money becomes.
 *
 * `priority` follows the build sequence — the roof has to stop the water
 * before the facade is worth restoring, and the rooms have to exist before
 * they can be equipped. DRAFT — պատվիրատուի հաստատման կարիք ունի: the client
 * may have a different order, and only they know it.
 *
 * `amount` is null everywhere. No cost figure exists anywhere in this project,
 * and a fundraising page is the last place to estimate one. `FundingPriorities`
 * renders the list without prices until real figures arrive.
 */
export const donationOptions: DonationOption[] = [
  {
    id: "restoration",
    priority: 2,
    amount: null,
    status: "planned",
    area: "—",
    title: {
      en: "Restoring the monument",
      hy: "Հուշարձանի վերականգնում",
      ru: "Восстановление памятника",
    },
    description: {
      en: "Reopening the bricked-up windows, restoring the cornices and sills, and cleaning the tuff facade by gentle methods.",
      hy: "Տուֆի բլոկներով փակված պատուհանների վերաբացում, քիվերի ու պատուհանագոգերի վերականգնում և ճակատի նուրբ մաքրում։",
      ru: "Раскрытие заложенных окон, восстановление карнизов и подоконников, бережная очистка туфового фасада.",
    },
  },
  {
    id: "roof",
    priority: 1,
    amount: null,
    status: "planned",
    area: null,
    title: {
      en: "The new roof",
      hy: "Նոր տանիք",
      ru: "Новая кровля",
    },
    description: {
      en: "20% of the roof covering is gone and the rafters are almost entirely damaged. The replacement stands on its own steel structure.",
      hy: "Տանիքի ծածկի 20%-ը բացակայում է, ծպեղնաոտերը գրեթե ամբողջությամբ վնասված են։ Նորը հենվում է սեփական մետաղյա կոնստրուկցիայի վրա։",
      ru: "20% кровли отсутствует, стропила повреждены почти полностью. Новая кровля опирается на собственную металлическую конструкцию.",
    },
  },
  {
    id: "lab",
    priority: 3,
    amount: null,
    status: "planned",
    area: "215,33",
    title: {
      en: "Operating room & cadaver lab",
      hy: "Վիրահատարան և կադավեր լաբորատորիա",
      ru: "Операционная и кадавер-лаборатория",
    },
    description: {
      en: "The 93 m² operating room, the 34 m² lab and the cold storage on the −3.900 level — the technical heart of the center.",
      hy: "93 քմ վիրահատարանը, 34 քմ լաբորատորիան և սառնարանը −3.900 նիշում՝ կենտրոնի տեխնիկական սիրտը։",
      ru: "Операционная 93 м², лаборатория 34 м² и холодильная камера на отметке −3.900 — техническое сердце центра.",
    },
  },
  {
    id: "teaching",
    priority: 4,
    amount: null,
    status: "planned",
    area: "54",
    title: {
      en: "Study rooms & library",
      hy: "Ուսումնական սենյակներ և գրադարան",
      ru: "Учебные комнаты и библиотека",
    },
    description: {
      en: "Three study rooms and a 54 m² library on the monument's own floor, where the reopened windows let daylight back in.",
      hy: "Երեք ուսումնական սենյակ և 54 քմ գրադարան հուշարձանի հարկում, որտեղ վերաբացված պատուհաններով վերադառնում է ցերեկային լույսը։",
      ru: "Три учебные комнаты и библиотека 54 м² на этаже памятника, куда через раскрытые окна возвращается дневной свет.",
    },
  },
  {
    id: "equipment",
    priority: 5,
    amount: null,
    status: "planned",
    area: null,
    title: {
      en: "Training equipment",
      hy: "Ուսուցման սարքավորումներ",
      ru: "Учебное оборудование",
    },
    description: {
      en: "Surgical instruments, lab equipment and the fit-out that turns finished rooms into a working teaching environment.",
      hy: "Վիրաբուժական գործիքներ, լաբորատոր սարքավորումներ և կահավորում, որոնք ավարտված սենյակները դարձնում են գործող ուսումնական միջավայր։",
      ru: "Хирургические инструменты, лабораторное оборудование и оснащение, превращающее готовые помещения в рабочую учебную среду.",
    },
  },
  {
    id: "courtyard",
    priority: 6,
    amount: null,
    status: "planned",
    area: "335,79",
    title: {
      en: "Courtyard & green terrace",
      hy: "Բակ և կանաչապատ տերաս",
      ru: "Двор и озеленённая терраса",
    },
    description: {
      en: "336 m² of planting, the inner courtyard and the roof terrace — the part of the site that also gives something back to the neighbourhood.",
      hy: "336 քմ կանաչապատում, ներքին բակը և տանիքի տերասը՝ նախագծի այն մասը, որը տալիս է նաև թաղամասին։",
      ru: "336 м² озеленения, внутренний двор и кровельная терраса — часть проекта, которая работает и на квартал.",
    },
  },
];

/** Funding options in build order. */
export function getDonationOptions() {
  return [...donationOptions].sort((a, b) => a.priority - b.priority);
}

/** True once at least one option carries a confirmed cost. */
export function hasDonationAmounts(): boolean {
  return donationOptions.some((option) => option.amount !== null);
}
