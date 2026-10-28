/**
 * The five founders of ASCEL, written once and used twice:
 *
 * - `scripts/update-founders.mts` turns it into Sanity documents (dry run by
 *   default; nothing is written without `--apply`);
 * - `src/data/foundersPreview.ts` shows it in local development, so the page
 *   can be reviewed before anything reaches the dataset.
 *
 * Names and order were confirmed by the client. Only first and last names are
 * shown — never a patronymic. Every biographical statement is taken from the
 * sources listed with each founder; where nothing could be verified (John
 * Karapetyan) the profile carries the name alone.
 */

type Localized = { hy: string; en: string; ru: string };

export type FounderSeed = {
  id: string;
  order: number;
  firstName: Localized;
  lastName: Localized;
  role?: Localized;
  bio?: Localized;
  bioExtended?: Localized;
  /** An existing asset in the dataset, used only with `--with-existing-photos`. */
  existingPhotoAsset?: string;
  /**
   * A portrait kept locally in .preview/founders (outside the repo's public
   * files) until its owner allows reuse; uploaded only with `--upload-photos`.
   */
  photoFile?: string;
  photoCredit?: string;
  sources: Array<{ label: string; url: string }>;
};

export const PLACEHOLDER_FOUNDER_IDS = [
  "founder-placeholder-1",
  "founder-placeholder-2",
  "founder-placeholder-3",
  "founder-placeholder-4",
];

const eternalNation = { label: "Eternal Nation — leadership", url: "https://www.eternalnation.com/leadership/" };
const eternalNationRu = { label: "Вечная Нация — правление", url: "https://www.eternalnation.com/правление/" };

export const founderSeeds: FounderSeed[] = [
  {
    id: "founder-shahen-danielyan",
    order: 1,
    firstName: { hy: "Շահեն", en: "Shahen", ru: "Шаген" },
    lastName: { hy: "Դանիելյան", en: "Danielyan", ru: "Даниелян" },
    role: {
      hy: "Կրծքային վիրաբույժ, բժշկական գիտությունների դոկտոր",
      en: "Thoracic surgeon, Doctor of Medical Sciences",
      ru: "Торакальный хирург, доктор медицинских наук",
    },
    bio: {
      hy: "1995 թվականին ավարտել է Երևանի պետական բժշկական համալսարանը։ Ավելի քան քսան տարի աշխատել է Մոսկվայի Ն. Վ. Սկլիֆոսովսկու անվան շտապ բժշկական օգնության գիտահետազոտական ինստիտուտի թորակոաբդոմինալ վիրաբուժության բաժանմունքում՝ հասնելով առաջատար գիտաշխատողի պաշտոնի։ 2022 թվականից ղեկավարում է Երևանի «Աստղիկ» բժշկական կենտրոնի կրծքային վիրաբուժության կլինիկան և Ս. Ավդալբեկյանի անվան առողջապահության ազգային ինստիտուտի կրծքային վիրաբուժության ամբիոնը։ 264 գիտական աշխատանքի հեղինակ է։",
      en: "A 1995 graduate of Yerevan State Medical University, he spent more than twenty years in the thoracoabdominal surgery department of the Sklifosovsky Research Institute for Emergency Medicine in Moscow, rising to leading researcher. Since 2022 he has headed the Thoracic Surgery Clinic at Astghik Medical Center in Yerevan and the Department of Thoracic Surgery at the S. Avdalbekyan National Institute of Health. He is the author of 264 scientific publications.",
      ru: "В 1995 году окончил Ереванский государственный медицинский университет. Более двадцати лет работал в отделении торакоабдоминальной хирургии НИИ скорой помощи им. Н. В. Склифосовского в Москве, пройдя путь до ведущего научного сотрудника. С 2022 года руководит клиникой торакальной хирургии медицинского центра «Астхик» в Ереване и заведует кафедрой торакальной хирургии Национального института здравоохранения им. С. Авдалбекяна. Автор 264 научных работ.",
    },
    bioExtended: {
      hy: "2016–2021 թվականներին ղեկավարել է Սկլիֆոսովսկու ինստիտուտի կրծքային վիրաբուժության օրդինատուրայի ծրագիրը։ Կրծքային վիրաբույժների եվրոպական ընկերության (ESTS), Կրծքային վիրաբույժների ընկերության (STS), Կերակրափողի հիվանդությունների միջազգային (ISDE) և եվրոպական (ESDE) ընկերությունների անդամ է։ Eternal Nation հիմնադրամի տնօրենների խորհրդի անդամ է։",
      en: "From 2016 to 2021 he directed the thoracic surgery residency programme at the Sklifosovsky Institute. He is a member of the European Society of Thoracic Surgeons (ESTS), the Society of Thoracic Surgeons (STS), and the International and European Societies for Diseases of the Esophagus (ISDE, ESDE). He sits on the board of the Eternal Nation Foundation.",
      ru: "В 2016–2021 годах руководил ординатурой по торакальной хирургии в НИИ им. Н. В. Склифосовского. Член Европейского общества торакальных хирургов (ESTS), Общества торакальных хирургов (STS), Международного и Европейского обществ по заболеваниям пищевода (ISDE, ESDE). Член правления фонда «Вечная Нация».",
    },
    photoFile: "shahen-danielyan.jpg",
    photoCredit: "Astghik Medical Center",
    sources: [
      { label: "Astghik Medical Center — profile", url: "https://www.mcastghik.com/eng/doctor/shahen-danielyan/" },
      eternalNation,
      eternalNationRu,
    ],
  },
  {
    id: "founder-john-karapetyan",
    order: 2,
    firstName: { hy: "Ջոն", en: "John", ru: "Джон" },
    lastName: { hy: "Կարապետյան", en: "Karapetyan", ru: "Карапетян" },
    role: { hy: "Վնասվածքաբան", en: "Traumatologist", ru: "Травматолог" },
    // Only his post is public (the hospital's own video); a fuller biography
    // has to come from him.
    bio: {
      hy: "Վնասվածքաբան է «Գյումրի» բժշկական կենտրոնում։",
      en: "He is a traumatologist at Gyumri Medical Center.",
      ru: "Травматолог медицинского центра «Гюмри».",
    },
    photoFile: "john-karapetyan.jpg",
    photoCredit: "Tsayg TV / Gyumri Medical Center",
    sources: [
      { label: "Gyumri Medical Center — video interview", url: "https://www.facebook.com/watch/?v=557165439935664" },
      { label: "Gyumri Orthopedic School — 2019 course participants", url: "https://gyumriorthoschool.org/260319" },
    ],
  },
  {
    id: "founder-atom-ter-grigoryan",
    order: 3,
    firstName: { hy: "Ատոմ", en: "Atom", ru: "Атом" },
    lastName: { hy: "Տեր-Գրիգորյան", en: "Ter-Grigoryan", ru: "Тер-Григорян" },
    role: { hy: "Վնասվածքաբան-օրթոպեդ", en: "Trauma and orthopaedic surgeon", ru: "Травматолог-ортопед" },
    bio: {
      hy: "1995 թվականին ավարտել է Մ. Հերացու անվան Երևանի պետական բժշկական համալսարանը և մասնագիտական կրթությունը շարունակել Մոսկվայում։ Մասնագիտանում է ծանր համակցված վնասվածքների և կոնքի կոտրվածքների վիրաբուժական բուժման մեջ։ Ղեկավարում է Միքայելյանի անվան վիրաբուժության ինստիտուտի վնասվածքաբանության և օրթոպեդիայի կլինիկան և դասավանդում Gyumri Orthopedic School-ում։",
      en: "He graduated from Yerevan State Medical University in 1995 and continued his training in Moscow. He specializes in the surgical treatment of severe combined trauma and pelvic fractures. He heads the trauma and orthopaedics clinic at the Mikaelyan Institute of Surgery and teaches at Gyumri Orthopedic School.",
      ru: "В 1995 году окончил Ереванский государственный медицинский университет им. М. Гераци, затем продолжил обучение в Москве. Специализируется на хирургическом лечении тяжёлой сочетанной травмы и переломов таза. Руководит клиникой травматологии и ортопедии Института хирургии им. Микаеляна, преподаёт в Gyumri Orthopedic School.",
    },
    bioExtended: {
      hy: "1999–2002 թվականներին սովորել է Ռուսաստանի վիրաբուժության գիտական կենտրոնի ասպիրանտուրայում, 2003 թվականից ղեկավարել է Ռուսաստանի արտակարգ իրավիճակների նախարարության Կենտրոնական տարածաշրջանային փրկարարական կենտրոնի բժշկական ծառայությունը։ 2015 թվականից ղեկավարել է Օդինցովոյի շրջանային հիվանդանոցի վնասվածքաբանության, օրթոպեդիայի և նյարդավիրաբուժության բաժանմունքը։ 1993 և 2020 թվականներին բժշկական օգնություն է ցուցաբերել Արցախում վիրավորներին։ Eternal Nation հիմնադրամի տնօրենների խորհրդի անդամ է։",
      en: "From 1999 to 2002 he did postgraduate research at the Russian Scientific Center of Surgery, and from 2003 headed the medical service of the Central Regional Rescue Center of the Russian Ministry of Emergency Situations. From 2015 he headed the department of traumatology, orthopaedics and neurosurgery at Odintsovo District Hospital. In 1993 and 2020 he treated the wounded in Artsakh. He sits on the board of the Eternal Nation Foundation.",
      ru: "В 1999–2002 годах учился в аспирантуре Российского научного центра хирургии, с 2003 года руководил медицинской службой Центрального регионального спасательного центра МЧС России. С 2015 года возглавлял отделение травматологии, ортопедии и нейрохирургии Одинцовской районной больницы. В 1993 и 2020 годах оказывал помощь раненым в Арцахе. Член правления фонда «Вечная Нация».",
    },
    photoFile: "atom-ter-grigoryan.jpg",
    photoCredit: "Mikaelyan Institute of Surgery",
    sources: [
      { label: "Mikaelyan Institute of Surgery — profile", url: "https://mikayelyan.am/page69-1023-hy-88-" },
      { label: "Gyumri Orthopedic School — faculty, 2026", url: "https://gyumriorthoschool.org/footankle2026" },
      eternalNation,
      eternalNationRu,
    ],
  },
  {
    id: "founder-norayr-zakaryan",
    order: 4,
    firstName: { hy: "Նորայր", en: "Norayr", ru: "Норайр" },
    lastName: { hy: "Զաքարյան", en: "Zakharyan", ru: "Захарян" },
    role: {
      hy: "Վնասվածքաբան-օրթոպեդ, բժշկական գիտությունների թեկնածու",
      en: "Trauma and orthopaedic surgeon, PhD",
      ru: "Травматолог-ортопед, кандидат медицинских наук",
    },
    bio: {
      hy: "2021 թվականից ղեկավարում է ակադեմիկոս Ս. Ավդալբեկյանի անվան առողջապահության ազգային ինստիտուտի օրթոպեդիայի բաժինը։ Մինչ այդ աշխատել է Մոսկվայի թիվ 31 քաղաքային կլինիկական հիվանդանոցում, որտեղ 2012–2021 թվականներին ղեկավարել է օրթոպեդիայի բաժանմունքը։ Gyumri Orthopedic School միջազգային կրթական նախագծի հիմնադիրներից է։",
      en: "Since 2021 he has headed the Department of Orthopaedics at the Academician S. Avdalbekyan National Institute of Health in Yerevan. Before that he worked at City Clinical Hospital No. 31 in Moscow, where he headed the orthopaedic department from 2012 to 2021. He is one of the founders of the international educational project Gyumri Orthopedic School.",
      ru: "С 2021 года руководит отделением ортопедии Национального института здравоохранения им. академика С. Авдалбекяна в Ереване. До этого работал в ГКБ № 31 Москвы, где в 2012–2021 годах заведовал отделением ортопедии. Один из основателей международного образовательного проекта Gyumri Orthopedic School.",
    },
    existingPhotoAsset: "image-e9c32da9393aafebe5abe96075a9ab467691043a-300x300-png",
    photoCredit: "Gyumri Orthopedic School",
    sources: [
      { label: "Wigmore Clinic — profile", url: "https://wigmore.am/en/wigmore-clinic/vrachi/norayr-zakaryan-ortoped-travmatolog" },
      eternalNation,
      eternalNationRu,
      { label: "Gyumri Orthopedic School — faculty, 2026", url: "https://gyumriorthoschool.org/footankle2026" },
    ],
  },
  {
    id: "founder-armen-hagopjanian",
    order: 5,
    firstName: { hy: "Արմեն", en: "Armen", ru: "Армен" },
    lastName: { hy: "Հակոբջանյան", en: "Hagopjanian", ru: "Акопджанян" },
    role: {
      hy: "Ոտնաթաթի և սրունք-թաթային հոդի վիրաբույժ, պոդիատրիայի դոկտոր (DPM)",
      en: "Foot and ankle surgeon, DPM",
      ru: "Хирург стопы и голеностопного сустава, доктор подиатрической медицины (DPM)",
    },
    bio: {
      hy: "Բժշկական կրթությունը սկսել է Երևանի պետական բժշկական ինստիտուտում և ավարտել ԱՄՆ-ում՝ Կալիֆոռնիայի համալսարանում (UCLA) և Կալիֆոռնիայի պոդիատրիկ բժշկության քոլեջում։ Լոս Անջելեսի ոտնաթաթի և սրունք-թաթային հոդի վիրաբուժության ինստիտուտի հիմնադիրն ու ղեկավարն է։ Eternal Nation հիմնադրամի նախագահն է և դասավանդում է Gyumri Orthopedic School-ում։",
      en: "He began his medical education at Yerevan State Medical Institute and completed it in the United States, at UCLA and the California College of Podiatric Medicine. He is the founder and CEO of the Los Angeles Institute of Foot and Ankle Surgery. He is President of the Eternal Nation Foundation and teaches at Gyumri Orthopedic School.",
      ru: "Начал медицинское образование в Ереванском государственном медицинском университете и завершил его в США — в Калифорнийском университете (UCLA) и Калифорнийском колледже подиатрической медицины. Основатель и руководитель Los Angeles Institute of Foot and Ankle Surgery. Президент фонда «Вечная Нация», преподаёт в Gyumri Orthopedic School.",
    },
    existingPhotoAsset: "image-62e51277a2e5a4e673526c61323981d8c8d9a5cd-500x500-png",
    photoCredit: "Gyumri Orthopedic School",
    sources: [
      eternalNation,
      eternalNationRu,
      { label: "Providence — provider profile", url: "https://www.providence.org/doctors/profile/198064-armen-hagopjanian/" },
      { label: "Gyumri Orthopedic School — faculty, 2026", url: "https://gyumriorthoschool.org/footankle2026" },
    ],
  },
];

const localized = (value: Localized) => ({ _type: "localizedString", ...value });

/** One founder as a Sanity document. Photos are attached only when asked for. */
export function founderDocument(
  seed: FounderSeed,
  { withPhotos = false, uploaded }: { withPhotos?: boolean; uploaded?: Record<string, string> } = {},
) {
  const photoRef = uploaded?.[seed.id] ?? (withPhotos ? seed.existingPhotoAsset : undefined);
  return {
    _id: seed.id,
    _type: "founder",
    order: seed.order,
    isActive: true,
    firstName: localized(seed.firstName),
    lastName: localized(seed.lastName),
    ...(seed.role ? { role: localized(seed.role) } : {}),
    ...(seed.bio ? { bio: { _type: "localizedText", ...seed.bio } } : {}),
    ...(seed.bioExtended ? { bioExtended: { _type: "localizedText", ...seed.bioExtended } } : {}),
    ...(photoRef
      ? {
          photo: {
            _type: "image",
            asset: { _type: "reference", _ref: photoRef },
            ...(seed.photoCredit ? { credit: seed.photoCredit } : {}),
          },
        }
      : {}),
    sources: seed.sources.map((source, index) => ({ _type: "founderSource", _key: `s${index}`, ...source })),
  };
}
