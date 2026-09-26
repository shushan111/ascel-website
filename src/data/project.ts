import type { LocalizedString } from "@/types";

/**
 * The building project itself — the one thing the whole site is about.
 *
 * Every figure, room name and restoration step below is taken from the
 * sketch design (էսքիզային նախագիծ) for the Medical Training Center at
 * Myasnikyan St. 20-22, Gyumri, dated 07/11/2026. Nothing here is invented:
 * when the drawings are revised, this file is the single place to update.
 */

export const projectMeta = {
  /** Cadastral parcel from the title block. */
  landPlot: "08-001-1333-0029",
  addressLine: {
    hy: "ք. Գյումրի, Մյասնիկյան փ. 20-22",
    ru: "г. Гюмри, ул. Мясникяна 20-22",
    en: "20-22 Myasnikyan St., Gyumri",
  } as LocalizedString,
  architects: {
    hy: "Ա. Հակոբյան, Կ. Բերբերյան, Լ. Սիմոնյան",
    ru: "А. Акопян, К. Берберян, Л. Симонян",
    en: "A. Hakobyan, K. Berberyan, L. Simonyan",
  } as LocalizedString,
  stage: {
    hy: "Էսքիզային նախագիծ",
    ru: "Эскизный проект",
    en: "Sketch design",
  } as LocalizedString,
  drawingDate: "2026-11-07",
} as const;

export interface ProjectFigure {
  id: string;
  /** Rendered as-is: the drawings state areas to two decimals. */
  value: string;
  unit?: string;
  label: LocalizedString;
}

/** The technical indicators table from sheet 2 of the drawing set. */
export const projectFigures: ProjectFigure[] = [
  {
    id: "totalBuilt",
    value: "713,92",
    unit: "քմ",
    label: {
      hy: "Ընդհանուր կառուցապատում",
      ru: "Общая площадь застройки",
      en: "Total built area",
    },
  },
  {
    id: "footprint",
    value: "206,62",
    unit: "քմ",
    label: {
      hy: "Կառուցապատման մակերես",
      ru: "Пятно застройки",
      en: "Building footprint",
    },
  },
  {
    id: "green",
    value: "335,79",
    unit: "քմ",
    label: {
      hy: "Կանաչապատում",
      ru: "Озеленение",
      en: "Landscaped area",
    },
  },
  {
    id: "levels",
    value: "3",
    label: {
      hy: "Հարկ՝ նկուղ, մուտք, վերնահարկ",
      ru: "Уровня: подвал, вход, верхний этаж",
      en: "Levels: basement, ground, upper",
    },
  },
];

export interface ProjectRoom {
  /** Room number as printed on the floor plan. */
  no: string;
  name: LocalizedString;
  /** Square metres, as printed. Omitted for circulation lumped in the total. */
  area?: string;
}

export interface ProjectLevel {
  id: string;
  /** Structural level, e.g. "-3.900". */
  elevation: string;
  title: LocalizedString;
  summary: LocalizedString;
  total: string;
  rooms: ProjectRoom[];
  image: string;
  imageAlt: LocalizedString;
}

/** Sheets 27, 28 and 30: the three occupied levels. */
export const projectLevels: ProjectLevel[] = [
  {
    id: "basement",
    elevation: "-3.900",
    title: {
      hy: "Աշխատանքային հարկ",
      ru: "Рабочий уровень",
      en: "Working level",
    },
    summary: {
      hy: "Փակ, կլիմայավերահսկվող հարկ՝ վիրահատարանով և կադավեր (վետ-) լաբորատորիայով։ Շենքի բարձրությունը կրճատվել է հենց այս մութ գոտիները հողի տակ տանելու համար՝ փողոցից շենքը մնում է ցածրահարկ։",
      ru: "Закрытый климат-контролируемый уровень с операционной и кадавер-лабораторией. Высота здания снижена именно ради того, чтобы увести эти «тёмные» зоны под землю.",
      en: "A closed, climate-controlled level holding the operating room and the cadaver lab. The building was lowered precisely so these dark zones could go underground.",
    },
    total: "215,33",
    rooms: [
      { no: "01", name: { hy: "Սառնարան", ru: "Холодильная", en: "Cold storage" }, area: "25,75" },
      { no: "02", name: { hy: "Վետ-լաբ", ru: "Вет-лаборатория", en: "Vet lab" }, area: "34,30" },
      { no: "03", name: { hy: "Վիրահատարան", ru: "Операционная", en: "Operating room" }, area: "93,01" },
      { no: "04", name: { hy: "Տեխնիկական սենյակ", ru: "Техническое помещение", en: "Technical room" }, area: "11,90" },
      { no: "05", name: { hy: "Հանդերձարաններ", ru: "Раздевалки", en: "Changing rooms" }, area: "27,57" },
      { no: "06", name: { hy: "Միջանցքներ", ru: "Коридоры", en: "Circulation" }, area: "22,80" },
    ],
    image: "/images/project/entrance.webp",
    imageAlt: {
      hy: "Մուտքը՝ կանաչապատ թեքահարթակով",
      ru: "Вход с озеленённым пандусом",
      en: "The entrance and its planted ramp",
    },
  },
  {
    id: "ground",
    elevation: "±0.000",
    title: {
      hy: "Կրթական հարկ",
      ru: "Образовательный уровень",
      en: "Education level",
    },
    summary: {
      hy: "Հուշարձան շենքի հարկը՝ ուսումնական սենյակներ, գրադարան, ընդունարան և սրճարան՝ բացված դեպի ներքին բակը։ Սա այն հարկն է, որը վերականգնված պատուհաններով երևում է Մյասնիկյան փողոցից։",
      ru: "Уровень здания-памятника: учебные комнаты, библиотека, приёмная и кафе, открытое во внутренний двор. Именно он виден с улицы Мясникяна.",
      en: "The monument's own level: study rooms, library, reception and a café opening onto the courtyard. This is the floor seen from Myasnikyan Street.",
    },
    total: "312,42",
    rooms: [
      { no: "01", name: { hy: "Ախոռներ", ru: "Боксы", en: "Boxes" }, area: "14,95" },
      { no: "02", name: { hy: "Ուսումնական սենք", ru: "Учебная комната", en: "Study room" }, area: "26,96" },
      { no: "03", name: { hy: "Ուսումնական սենք", ru: "Учебная комната", en: "Study room" }, area: "29,00" },
      { no: "04", name: { hy: "Ուսումնական սենք", ru: "Учебная комната", en: "Study room" }, area: "22,74" },
      { no: "06", name: { hy: "Գրասենյակային տարածք", ru: "Офисная зона", en: "Office area" }, area: "40,54" },
      { no: "07", name: { hy: "Ընդունարան", ru: "Приёмная", en: "Reception" }, area: "21,30" },
      { no: "08", name: { hy: "Սրճարան", ru: "Кафе", en: "Café" }, area: "26,92" },
      { no: "09", name: { hy: "Խոհանոց", ru: "Кухня", en: "Kitchen" }, area: "16,49" },
      { no: "10", name: { hy: "Գրադարան", ru: "Библиотека", en: "Library" }, area: "54,40" },
    ],
    image: "/images/project/courtyard.webp",
    imageAlt: {
      hy: "Ներքին բակը՝ հուշարձան շենքի վերականգնված պատուհաններով",
      ru: "Внутренний двор с восстановленными окнами здания-памятника",
      en: "The courtyard, with the monument's restored windows",
    },
  },
  {
    id: "upper",
    elevation: "+4.500",
    title: {
      hy: "Հանդիպումների հարկ",
      ru: "Уровень встреч",
      en: "Meeting level",
    },
    summary: {
      hy: "Ալիքաձև տանիքի տակ՝ սրահ, հանգստի գոտի և կանաչապատ տերաս։ Այս ծավալը փողոցից գրեթե չի երևում. այն կապում է հուշարձանը նոր շենքի հետ։",
      ru: "Под волнообразной кровлей — зал, зона отдыха и озеленённая терраса. С улицы этот объём почти не виден и связывает памятник с новым корпусом.",
      en: "Under the wave roof: a hall, a rest area and a planted terrace. Barely visible from the street, this volume ties the monument to the new building.",
    },
    total: "215,33",
    rooms: [
      { no: "01", name: { hy: "Հանգստի զոնա", ru: "Зона отдыха", en: "Rest area" }, area: "25,75" },
      { no: "03", name: { hy: "Սրահ", ru: "Зал", en: "Hall" }, area: "93,01" },
      { no: "04", name: { hy: "Տերաս", ru: "Терраса", en: "Terrace" }, area: "11,90" },
      { no: "05", name: { hy: "Միջանցքներ", ru: "Коридоры", en: "Circulation" }, area: "42,07" },
      { no: "02", name: { hy: "Սանհանգույցներ", ru: "Санузлы", en: "Restrooms" }, area: "34,30" },
    ],
    image: "/images/project/terrace.webp",
    imageAlt: {
      hy: "Կանաչապատ բակը՝ վերին ծավալի տակ",
      ru: "Озеленённый двор под верхним объёмом",
      en: "The planted courtyard beneath the upper volume",
    },
  },
];

export interface ProjectStep {
  no: string;
  title: LocalizedString;
}

/** Sheet 22: the six massing steps, in order. */
export const projectSteps: ProjectStep[] = [
  {
    no: "01",
    title: {
      hy: "Տարածք և գոյություն ունեցող շենք",
      ru: "Участок и существующее здание",
      en: "Site and existing building",
    },
  },
  {
    no: "02",
    title: {
      hy: "Փակված պատուհանային բացվածքների վերականգնում և տանիքի ապամոնտաժում",
      ru: "Раскрытие заложенных окон и демонтаж кровли",
      en: "Reopening the blocked windows and removing the roof",
    },
  },
  {
    no: "03",
    title: {
      hy: "Նոր տանիքի կրող կոնստրուկցիայի տեղադրում, նոր մակերեսի ավելացում",
      ru: "Установка несущей конструкции новой кровли",
      en: "Setting the new roof's load-bearing structure",
    },
  },
  {
    no: "04",
    title: {
      hy: "Առաջին հարկի ընդլայնում՝ ուսումնական տարածք",
      ru: "Расширение первого этажа — учебная зона",
      en: "Extending the ground floor into teaching space",
    },
  },
  {
    no: "05",
    title: {
      hy: "Տանիքի տեղադրում և տանիքածածկի իրականացում",
      ru: "Монтаж кровли и кровельного покрытия",
      en: "Installing the roof and its covering",
    },
  },
  {
    no: "06",
    title: {
      hy: "Երկրորդ հարկի հավելում՝ փողոցից չտեսանելի ծավալ",
      ru: "Добавление второго этажа — объём, не видимый с улицы",
      en: "Adding the second floor — a volume unseen from the street",
    },
  },
];

export interface ProjectCondition {
  id: string;
  now: LocalizedString;
  after: LocalizedString;
}

/** Sheets 12, 36 and 37: the monument's damage, paired with its repair. */
export const projectConditions: ProjectCondition[] = [
  {
    id: "windows",
    now: {
      hy: "Բոլոր պատուհանային բացվածքները փակված են տուֆի բլոկներով։",
      ru: "Все оконные проёмы заложены туфовыми блоками.",
      en: "Every window opening is bricked up with tuff blocks.",
    },
    after: {
      hy: "Բոլոր լուսամուտախորշերը վերաբացվում են և ստանում սպիտակ ներկված փայտե շրջանակներ՝ 19-20-րդ դարի Գյումրու տներին բնորոշ։",
      ru: "Все проёмы раскрываются и получают белые деревянные рамы, характерные для гюмрийских домов XIX-XX веков.",
      en: "Every opening is reopened and given the white-painted wooden frames typical of 19th-20th century Gyumri houses.",
    },
  },
  {
    id: "roof",
    now: {
      hy: "Տանիքի ծածկի 20%-ը բացակայում է, ծպեղնաոտերն ու թեքանները գրեթե ամբողջությամբ վնասված են։",
      ru: "20% кровельного покрытия отсутствует, стропила повреждены почти полностью.",
      en: "20% of the roof covering is gone; the rafters are almost entirely damaged.",
    },
    after: {
      hy: "Նոր տանիքը հավաքվում է առանձին մետաղյա կոնստրուկցիայով՝ առանց հուշարձանի կոնստրուկցիային միջամտելու։",
      ru: "Новая кровля собирается на отдельной металлической конструкции, не вмешиваясь в конструкцию памятника.",
      en: "The new roof stands on its own steel structure, without touching the monument's own.",
    },
  },
  {
    id: "cornices",
    now: {
      hy: "8 քիվերից 4-ը բացակայում է, մնացած 4-ը՝ վնասված։",
      ru: "Из 8 карнизов 4 утрачены, остальные 4 повреждены.",
      en: "Four of the eight cornices are missing; the other four are damaged.",
    },
    after: {
      hy: "Բոլոր քիվերն ու պատուհանագոգերը վերականգնվում են հուշարձանի նախկին տեսքին համապատասխան։",
      ru: "Все карнизы и подоконники восстанавливаются по первоначальному облику памятника.",
      en: "All cornices and sills are restored to the monument's original profile.",
    },
  },
  {
    id: "facade",
    now: {
      hy: "Ճակատի ստորին գոտում առկա է խոնավությունից առաջացած քայքայում։",
      ru: "В нижней зоне фасада — разрушение от влаги.",
      en: "The lower band of the facade is decaying from damp.",
    },
    after: {
      hy: "Ճակատը մաքրվում է նուրբ, անվտանգ մեթոդներով՝ պահպանելով քարի բնօրինակ տեսքը։",
      ru: "Фасад очищается мягкими безопасными методами с сохранением оригинального вида камня.",
      en: "The facade is cleaned by gentle, safe methods that keep the stone's original face.",
    },
  },
];

export interface ProjectGalleryItem {
  src: string;
  alt: LocalizedString;
  /** Intrinsic pixel size, so the masonry columns never crop a rendering. */
  width: number;
  height: number;
}

export const projectGallery: ProjectGalleryItem[] = [
  {
    src: "/images/project/aerial-after.webp",
    width: 2200,
    height: 1486,
    alt: {
      hy: "Կենտրոնը Գյումրու քաղաքային հյուսվածքում՝ վերևից",
      ru: "Центр в городской ткани Гюмри, вид сверху",
      en: "The center within Gyumri's urban fabric, seen from above",
    },
  },
  {
    src: "/images/project/courtyard-cafe.webp",
    width: 1400,
    height: 1905,
    alt: {
      hy: "Սրճարանը բակային տարածքով",
      ru: "Кафе с дворовой площадкой",
      en: "The café and its courtyard seating",
    },
  },
  {
    src: "/images/project/terrace.webp",
    width: 2000,
    height: 1125,
    alt: {
      hy: "Վերին ծավալը և կանաչապատ բակը",
      ru: "Верхний объём и озеленённый двор",
      en: "The upper volume over the planted courtyard",
    },
  },
  {
    src: "/images/project/entrance.webp",
    width: 1400,
    height: 1898,
    alt: {
      hy: "Մուտքը՝ կանաչապատ թեքահարթակով",
      ru: "Вход с озеленённым пандусом",
      en: "The entrance and its planted ramp",
    },
  },
  {
    src: "/images/project/site-plan.webp",
    width: 1800,
    height: 1276,
    alt: {
      hy: "Գլխավոր հատակագիծը՝ կանաչապատ տանիքով",
      ru: "Генплан с озеленённой кровлей",
      en: "The site plan with its green roof",
    },
  },
];
