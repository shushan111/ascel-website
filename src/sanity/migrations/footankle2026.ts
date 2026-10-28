/**
 * Content update for the "Foot and Ankle Surgery Days in Gyumri" course
 * (gos-course-footankle2026), written once and used twice:
 *
 * - `scripts/update-footankle2026.mts` turns it into a Sanity patch (dry run
 *   by default; nothing is written without `--apply`);
 * - `src/data/coursePreview.ts` applies it in memory in local development, so
 *   the page can be reviewed before anything reaches the dataset.
 *
 * Every statement here comes from the course programme or the published
 * recap (anklepro.ru, 5 Oct 2026). No attendance figures or outcomes.
 * Artak Matsakyan's affiliation is deliberately left as it is in the CMS
 * until the conflicting sources are resolved.
 */

export const FOOTANKLE_ID = "gos-course-footankle2026";
export const FOOTANKLE_SLUG = "footankle2026";

type Locale = "hy" | "en" | "ru";
type Localized = Record<Locale, string>;
type Block = Record<string, unknown> & { _type: string; _key?: string; style?: string; listItem?: string };
type ImageLike = { _key?: string; asset?: { _ref?: string; _id?: string } | null } | null | undefined;

export type CourseDocLike = {
  _id: string;
  title?: Partial<Localized> & { _type?: string };
  location?: Partial<Localized> & { _type?: string };
  body?: Partial<Record<Locale, Block[] | null>> | null;
  image?: ImageLike;
  gallery?: ImageLike[] | null;
};

const LOCALES: Locale[] = ["hy", "en", "ru"];

export const footankleContent = {
  titleHy: "Ոտնաթաթի և սրունք-թաթային հոդի վիրաբուժության օրեր Գյումրիում",

  location: {
    hy: "Գյումրի, «Լորկե» համալիր",
    en: "Gyumri, Lorke Complex",
    ru: "Гюмри, комплекс «Лорке»",
  } satisfies Localized,

  recap: {
    hy: [
      "2026 թվականի հոկտեմբերի 2–3-ը Գյումրու «Լորկե» համալիրում անցկացվեցին ոտնաթաթի և սրունք-թաթային հոդի վիրաբուժության օրերը։ Դասընթացը համախմբեց օրթոպեդ վիրաբույժներ Հայաստանից, Ռուսաստանից, ԱՄՆ-ից և Իրանից։",
      "Երկու օրվա գիտական ծրագիրն ընդգրկեց ոտնաթաթի և սրունք-թաթային հոդի վիրաբուժության հիմնական ուղղությունները՝ առջևի հատվածի դեֆորմացիաներից և մարզական վնասվածքներից մինչև կոտրվածքներ, դիաբետիկ ոտնաթաթ և ռևիզիոն վիրահատություններ։ Մանրամասն քննարկվեցին կլինիկական դեպքեր և բարդ հիվանդների բուժման մարտավարությունը, իսկ միջազգային դասախոսները կիսվեցին իրենց վիրաբուժական փորձով։ Ծրագրի գործնական մասում ցուցադրվեցին ոտնաթաթի նվազագույն ինվազիվ վիրաբուժության տեխնիկաները։",
    ],
    en: [
      "On 2–3 October 2026, the Lorke Complex in Gyumri hosted Foot and Ankle Surgery Days, bringing together orthopaedic surgeons from Armenia, Russia, the United States and Iran.",
      "Over two days, the scientific programme covered the main areas of foot and ankle surgery, from forefoot deformities and sports injuries to fractures, the diabetic foot and revision procedures. Clinical cases and the management of complex patients were discussed in detail, and the international faculty shared their own surgical experience. The practical part of the programme included demonstrations of minimally invasive foot surgery techniques.",
    ],
    ru: [
      "2–3 октября 2026 года в комплексе «Лорке» в Гюмри прошли Дни хирургии стопы и голеностопного сустава. Курс объединил хирургов-ортопедов из Армении, России, США и Ирана.",
      "За два дня научная программа охватила основные направления хирургии стопы и голеностопного сустава — от деформаций переднего отдела стопы и спортивных травм до переломов, синдрома диабетической стопы и ревизионных вмешательств. Подробно разбирались клинические случаи и тактика лечения сложных пациентов, а лекторы из разных стран поделились собственным хирургическим опытом. В практической части программы были продемонстрированы техники малоинвазивной хирургии стопы.",
    ],
  } satisfies Record<Locale, string[]>,

  // Drawn from the programme; each line names sessions that took place.
  highlights: [
    {
      hy: "Վարպետաց դաս ոտնաթաթի նվազագույն ինվազիվ վիրաբուժության վերաբերյալ",
      en: "Master class in minimally invasive foot surgery",
      ru: "Мастер-класс по малоинвазивной хирургии стопы",
    },
    {
      hy: "Ոտնաթաթի առջևի հատվածի վիրաբուժություն՝ hallux valgus, hallux rigidus, փոքր մատների դեֆորմացիաներ",
      en: "Forefoot surgery: hallux valgus, hallux rigidus and lesser toe deformities",
      ru: "Хирургия переднего отдела стопы: hallux valgus, hallux rigidus, деформации малых пальцев",
    },
    {
      hy: "Սրունք-թաթային հոդի քրոնիկ կողմնային անկայունություն, Աքիլլեսյան ջլի և պերոնեալ մկանների ջլերի վնասվածքներ, մարզիկների սթրես-կոտրվածքներ",
      en: "Chronic lateral ankle instability, Achilles and peroneal tendon injuries, stress fractures in athletes",
      ru: "Хроническая латеральная нестабильность голеностопного сустава, повреждения ахиллова сухожилия и сухожилий малоберцовых мышц, стрессовые переломы у спортсменов",
    },
    {
      hy: "Սրունք-թաթային հոդի արթրոսկոպիա, արթրոդեզ և էնդոպրոթեզավորում",
      en: "Ankle arthroscopy, arthrodesis and total ankle replacement",
      ru: "Артроскопия, артродез и эндопротезирование голеностопного сустава",
    },
    {
      hy: "Կոճերի, պիլոնի, խոյոսկրի և գարշապարոսկրի կոտրվածքներ, Լիսֆրանկի և Շոպարի հոդերի վնասվածքներ",
      en: "Ankle, pilon, talar and calcaneal fractures; Lisfranc and Chopart injuries",
      ru: "Переломы лодыжек, пилона, таранной и пяточной костей; повреждения суставов Лисфранка и Шопара",
    },
    {
      hy: "Դիաբետիկ ոտնաթաթ, Շարկոյի ոտնաթաթ և վերակառուցողական վիրահատություններ",
      en: "Diabetic foot, Charcot foot and reconstructive surgery",
      ru: "Синдром диабетической стопы, стопа Шарко и реконструктивные операции",
    },
    {
      hy: "Կլինիկական դեպքերի քննարկումներ և «Բաց խոսափող»՝ մասնակիցների դեպքերով",
      en: "Clinical case sessions, including an open-microphone discussion of participants' own cases",
      ru: "Разбор клинических случаев, включая случаи участников в формате «открытого микрофона»",
    },
  ] satisfies Localized[],

  // Replaces the two-item date list, one heading straight above each table.
  dayHeadings: [
    { hy: "Առաջին օր · 2 հոկտեմբերի, 2026", en: "Day 1 · 2 October 2026", ru: "День 1 · 2 октября 2026" },
    { hy: "Երկրորդ օր · 3 հոկտեմբերի, 2026", en: "Day 2 · 3 October 2026", ru: "День 2 · 3 октября 2026" },
  ] satisfies Localized[],

  /**
   * Faculty in programme order, matched to the headshots already in the
   * dataset by the source page (gyumriorthoschool.org): `image` is
   * Hagopjanian, gallery keys g0–g9 the others. g7/g8 are the grey and colour
   * versions of Georgy Nazaryan's headshot (the organizer uses the same files
   * on /hand2021 and /hand2022); g8, the colour one, is used.
   */
  facultyPhotos: {
    0: "image",
    1: "g0",
    4: "g1",
    6: "g2",
    8: "g3",
    9: "g4",
    10: "g5",
    11: "g6",
    13: "g8",
    14: "g9",
  } as Record<number, string>,

  /** The event photographs, in gallery order; the first is the featured one. */
  eventPhotos: [
    {
      file: "12.jpg",
      alt: "Դասախոսություն «Լորկե» համալիրի դահլիճում՝ էկրանին ոտնաթաթի ոսկրերի սխեմաներով",
      caption: {
        hy: "Դասախոսությունների դահլիճը «Լորկե» համալիրում",
        en: "The lecture hall at the Lorke Complex",
        ru: "Лекционный зал комплекса «Лорке»",
      },
    },
    {
      file: "06.jpg",
      alt: "Դասախոսը բեմից ներկայացնում է զեկույցը",
      caption: { hy: "Զեկույց բեմից", en: "A lecture from the stage", ru: "Доклад со сцены" },
    },
    {
      file: "09.jpg",
      alt: "Էկրանին ցուցադրվում է նվազագույն ինվազիվ տեխնիկան ոտնաթաթի կմախքի մոդելի վրա",
      caption: {
        hy: "Նվազագույն ինվազիվ տեխնիկայի ցուցադրություն մոդելի վրա",
        en: "Demonstrating a minimally invasive technique on a foot model",
        ru: "Демонстрация малоинвазивной техники на модели стопы",
      },
    },
    {
      file: "07.jpg",
      alt: "Գործնական պարապմունք՝ մասնակիցն աշխատում է ոտնաթաթի մոդելի վրա",
      caption: { hy: "Գործնական պարապմունք", en: "Hands-on session", ru: "Практическое занятие" },
    },
    {
      file: "08.jpg",
      alt: "Գործնական պարապմունքի սեղան՝ վիրաբուժական գործիքներով և ոտնաթաթի մոդելներով",
      caption: {
        hy: "Գործիքներ և մոդելներ գործնական պարապմունքի համար",
        en: "Instruments and models for the hands-on session",
        ru: "Инструменты и модели для практического занятия",
      },
    },
    {
      file: "10.jpg",
      alt: "Զեկույց բեմից՝ մասնակիցները հետևում են ներկայացմանը",
      caption: { hy: "Գիտական նստաշրջան", en: "Scientific session", ru: "Научная сессия" },
    },
    {
      file: "11.jpg",
      alt: "Մասնակիցները դահլիճում հետևում են վիրահատական տեխնիկայի ներկայացմանը",
      caption: {
        hy: "Վիրահատական տեխնիկայի ներկայացում",
        en: "Presentation of a surgical technique",
        ru: "Презентация хирургической техники",
      },
    },
    {
      file: "05.jpg",
      alt: "Մասնակիցները դասախոսության ժամանակ",
      caption: { hy: "Մասնակիցները դասախոսության ժամանակ", en: "Participants during a lecture", ru: "Участники во время лекции" },
    },
    {
      file: "13.jpg",
      alt: "Դահլիճի ընդհանուր տեսքը զեկույցի ժամանակ",
      caption: { hy: "Դահլիճը զեկույցի ժամանակ", en: "The hall during a lecture", ru: "Зал во время доклада" },
    },
  ],

  photoCredit: "AnklePro",
};

function blockText(block: Block): string {
  const children = block.children as Array<{ text?: string }> | undefined;
  return (children ?? []).map((child) => child.text ?? "").join("").trim();
}

function textBlock(key: string, text: string, style = "normal"): Block {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
  };
}

function assetRef(image: ImageLike): string | undefined {
  return image?.asset?._ref ?? image?.asset?._id ?? undefined;
}

/**
 * The programme part of the body: the day list becomes one heading above each
 * table; the intro and venue lines (shown in the page header and the facts),
 * the "Programme" heading (the page provides it) and the faculty list (now
 * structured) are taken out. The registration section is kept as a record —
 * the page hides it for a completed course.
 */
function programmeBody(blocks: Block[], locale: Locale): Block[] {
  const tables = blocks.filter((block) => block._type === "contentTable");
  if (tables.length !== 2) throw new Error(`footankle2026 body.${locale}: expected 2 programme tables, found ${tables.length}`);
  const facultyStart = blocks.findIndex(
    (block, index) => index > blocks.indexOf(tables[1]) && block.style === "h2",
  );
  const registrationStart = blocks.findIndex(
    (block, index) => index > facultyStart && block.style === "h2" && /ԳՐԱՆՑ|РЕГИСТРАЦ|REGISTRATION/i.test(blockText(block)),
  );
  const registration = registrationStart >= 0 ? blocks.slice(registrationStart) : [];
  const [day1, day2] = footankleContent.dayHeadings;
  return [
    textBlock("day1", day1[locale], "h3"),
    tables[0],
    textBlock("day2", day2[locale], "h3"),
    tables[1],
    ...registration,
  ];
}

/** Faculty as h2 name + paragraph pairs between the programme and registration. */
function facultyFromBody(blocks: Block[]) {
  const tablesEnd = blocks.map((block) => block._type).lastIndexOf("contentTable");
  const headings: Array<{ name: string; bio: string }> = [];
  for (let i = tablesEnd + 2; i < blocks.length; i += 1) {
    const block = blocks[i];
    if (block.style !== "h2") continue;
    if (/ԳՐԱՆՑ|РЕГИСТРАЦ|REGISTRATION/i.test(blockText(block))) break;
    const next = blocks[i + 1];
    headings.push({ name: blockText(block), bio: next && next.style === "normal" ? blockText(next) : "" });
  }
  return headings;
}

function splitCredentials(heading: string) {
  const comma = heading.indexOf(",");
  if (comma < 0) return { name: heading, credentials: "" };
  return { name: heading.slice(0, comma).trim(), credentials: heading.slice(comma + 1).trim() };
}

/**
 * The fields to `set` on the document. `eventPhotos` is passed in by the
 * caller: uploaded asset references from the script, local files from the
 * preview — and omitted entirely until the photographs may be published.
 */
export function buildFootanklePatch(
  doc: CourseDocLike,
  eventPhotos?: Array<Record<string, unknown>>,
): Record<string, unknown> {
  const body = doc.body ?? {};
  const perLocale = Object.fromEntries(
    LOCALES.map((locale) => {
      const blocks = body[locale];
      if (!blocks?.length) throw new Error(`footankle2026: body.${locale} is empty`);
      return [locale, blocks];
    }),
  ) as Record<Locale, Block[]>;

  const facultyByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, facultyFromBody(perLocale[locale])]),
  ) as Record<Locale, Array<{ name: string; bio: string }>>;
  const count = facultyByLocale.ru.length;
  for (const locale of LOCALES) {
    if (facultyByLocale[locale].length !== count) {
      throw new Error(`footankle2026: ${locale} lists ${facultyByLocale[locale].length} faculty, ru lists ${count}`);
    }
  }

  const galleryByKey = new Map((doc.gallery ?? []).map((image) => [image?._key, image]));
  const faculty = Array.from({ length: count }, (_, index) => {
    const parts = Object.fromEntries(
      LOCALES.map((locale) => [locale, splitCredentials(facultyByLocale[locale][index].name)]),
    ) as Record<Locale, { name: string; credentials: string }>;
    const photoKey = footankleContent.facultyPhotos[index];
    const ref = photoKey === "image" ? assetRef(doc.image) : photoKey ? assetRef(galleryByKey.get(photoKey)) : undefined;
    return {
      _type: "facultyMember",
      _key: `f${index}`,
      name: { _type: "localizedString", hy: parts.hy.name, en: parts.en.name, ru: parts.ru.name },
      ...(parts.ru.credentials
        ? { credentials: { _type: "localizedString", hy: parts.hy.credentials, en: parts.en.credentials, ru: parts.ru.credentials } }
        : {}),
      bio: {
        _type: "localizedText",
        hy: facultyByLocale.hy[index].bio,
        en: facultyByLocale.en[index].bio,
        ru: facultyByLocale.ru[index].bio,
      },
      ...(ref ? { photo: { _type: "image", asset: { _type: "reference", _ref: ref } } } : {}),
    };
  });

  const recap = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      footankleContent.recap[locale].map((text, index) => textBlock(`r${index}`, text)),
    ]),
  );

  return {
    "title.hy": footankleContent.titleHy,
    location: { _type: "localizedString", ...footankleContent.location },
    body: Object.fromEntries(LOCALES.map((locale) => [locale, programmeBody(perLocale[locale], locale)])),
    recap,
    highlights: footankleContent.highlights.map((item, index) => ({
      _type: "localizedString",
      _key: `h${index}`,
      ...item,
    })),
    faculty,
    ...(eventPhotos ? { eventPhotos } : {}),
  };
}

/** The caption and alt fields of one event photograph, ready for Sanity. */
export function eventPhotoFields(index: number) {
  const photo = footankleContent.eventPhotos[index];
  return {
    alt: { _type: "localizedString", hy: photo.alt, en: photo.caption.en, ru: photo.caption.ru },
    caption: { _type: "localizedString", ...photo.caption },
    credit: footankleContent.photoCredit,
  };
}
