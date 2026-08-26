import type { Program } from "@/types";
import { getExternalUrl } from "@/lib/utils";
import { gyumriOrthopedicSchoolDetail } from "./gyumri-orthopedic-school";

const programs: Program[] = [
  {
    id: "gyumri-orthopedic-school",
    slug: "gyumri-orthopedic-school",
    title: {
      en: "Gyumri Orthopedic School",
      hy: "Գյումրու օրթոպեդիական դպրոց",
      ru: "Гюмрийская ортопедическая школа",
    },
    shortTitle: {
      en: "Gyumri Orthopedic School",
      hy: "Գյումրու օրթոպեդիական դպրոց",
      ru: "Гюмрийская ортопедическая школа",
    },
    category: {
      en: "Educational Program",
      hy: "Կրթական ծրագիր",
      ru: "Образовательная программа",
    },
    description: {
      en: "An educational program dedicated to making current theoretical and practical knowledge in traumatology and orthopedics more accessible to physicians, through lecture-based teaching and hands-on laboratory work.",
      hy: "Կրթական ծրագիր, որի նպատակն է բժիշկների համար ավելի հասանելի դարձնել տրավմատոլոգիայի և օրթոպեդիայի արդի տեսական ու գործնական գիտելիքը՝ դասախոսությունների և գործնական լաբորատոր աշխատանքի միջոցով։",
      ru: "Образовательная программа, цель которой — сделать современные теоретические и практические знания в травматологии и ортопедии более доступными для врачей: через лекции и практическую лабораторную работу.",
    },
    overview: {
      en: "Gyumri Orthopedic School is one of ASCEL’s active educational programs. Courses are taught by practicing physicians and specialists from Armenia and other countries. Teaching combines focused lecture material with substantial practical sessions using anatomical models and contemporary surgical instrumentation. The program operates through its own official website; ASCEL presents it as part of a shared medical-education ecosystem, without replacing that independent site.",
      hy: "Գյումրու օրթոպեդիական դպրոցը ASCEL-ի գործող կրթական ծրագրերից է։ Դասընթացները վարում են գործող բժիշկներ և մասնագետներ Հայաստանից և այլ երկրներից։ Ուսուցումը համատեղում է կենտրոնացված դասախոսական նյութը գործնական պարապմունքների հետ՝ անատոմիական մոդելների և ժամանակակից վիրաբուժական գործիքների կիրառմամբ։ Ծրագիրն ունի սեփական պաշտոնական կայք։ ASCEL-ը այն ներկայացնում է որպես ընդհանուր բժշկական կրթական միջավայրի մաս՝ առանց փոխարինելու այդ անկախ կայքը։",
      ru: "Гюмрийская ортопедическая школа — одна из действующих образовательных программ ASCEL. Занятия ведут практикующие врачи и специалисты из Армении и других стран. Обучение сочетает сфокусированный лекционный материал с обширной практической частью на анатомических моделях и современном хирургическом инструментарии. У программы есть собственный официальный сайт; ASCEL представляет её как часть общей экосистемы медицинского образования, не подменяя этот независимый ресурс.",
    },
    image: "/images/program-orthopedic.webp",
    gallery: [
      "/images/program-orthopedic.webp",
      "/images/capability-simulation.webp",
      "/images/news-education.webp",
    ],
    objectives: [
      {
        en: "Increase access to current knowledge in traumatology and orthopedics.",
        hy: "Բարձրացնել տրավմատոլոգիայի և օրթոպեդիայի արդի գիտելիքի հասանելիությունը։",
        ru: "Расширить доступ к актуальным знаниям в травматологии и ортопедии.",
      },
      {
        en: "Combine structured lectures with practical, skills-based laboratory teaching.",
        hy: "Համատեղել կառուցվածքային դասախոսությունները գործնական, հմտությունների վրա հիմնված լաբորատոր ուսուցման հետ։",
        ru: "Сочетать структурированные лекции с практическим лабораторным обучением, ориентированным на навыки.",
      },
      {
        en: "Bring international and local faculty into a shared educational setting.",
        hy: "Միավորել միջազգային և տեղական դասախոսներին ընդհանուր կրթական միջավայրում։",
        ru: "Объединять международных и местных преподавателей в общем образовательном пространстве.",
      },
    ],
    activities: [
      {
        en: "Lecture-practical courses in orthopedic surgery and related nursing education.",
        hy: "Լեկցիոն-գործնական դասընթացներ օրթոպեդիկ վիրաբուժության և հարակից բուժքույրական կրթության ոլորտում։",
        ru: "Лекционно-практические курсы по ортопедической хирургии и смежному сестринскому образованию.",
      },
      {
        en: "Hands-on sessions using anatomical models and surgical instrumentation.",
        hy: "Գործնական պարապմունքներ անատոմիական մոդելների և վիրաբուժական գործիքների կիրառմամբ։",
        ru: "Практические занятия с использованием анатомических моделей и хирургического инструментария.",
      },
      {
        en: "Assessment during courses to review understanding of the material taught.",
        hy: "Դասընթացների ընթացքում գնահատում՝ անցած նյութի յուրացումը ստուգելու համար։",
        ru: "Оценка в ходе курсов для проверки усвоения пройденного материала.",
      },
    ],
    impact: [
      {
        en: "Impact metrics for this program will be published here when verified data is available.",
        hy: "Այս ծրագրի ազդեցության ցուցանիշները կհրապարակվեն այստեղ, երբ հաստատված տվյալները հասանելի լինեն։",
        ru: "Показатели эффективности этой программы будут опубликованы здесь, когда появятся подтверждённые данные.",
      },
    ],
    detail: gyumriOrthopedicSchoolDetail,
    externalUrlKey: "gyumriOrthopedicSchool",
    ctaLabel: "learnMore",
  },
  {
    id: "damage-control-courses",
    slug: "damage-control-courses",
    title: {
      en: "Damage Control Courses",
      hy: "Damage Control դասընթացներ",
      ru: "Курсы по Damage Control",
    },
    shortTitle: {
      en: "Damage Control Courses",
      hy: "Damage Control դասընթացներ",
      ru: "Курсы по Damage Control",
    },
    category: {
      en: "Professional Training",
      hy: "Մասնագիտական վերապատրաստում",
      ru: "Профессиональная подготовка",
    },
    description: {
      en: "A medical education direction focused on trauma care, damage-control principles, emergency surgical decision-making, and practical professional training.",
      hy: "Բժշկական կրթական ուղղություն, որի կենտրոնում են տրավմայի խնամքը, damage control սկզբունքները, շտապ վիրաբուժական որոշումների կայացումը և գործնական մասնագիտական ուսուցումը։",
      ru: "Направление медицинского образования, сосредоточенное на помощи при травме, принципах Damage Control, принятии решений в экстренной хирургии и практической профессиональной подготовке.",
    },
    overview: {
      en: "Damage Control Courses is an ASCEL training direction for physicians and surgical teams who need structured education in trauma and time-critical decision-making. The emphasis is on practical learning: recognizing priorities under pressure, applying damage-control principles, and working as a coordinated team. Course schedules, faculty, and registration details will be published when confirmed. If an independent program website is added later, it can be connected through the central configuration file.",
      hy: "Damage Control դասընթացները ASCEL-ի վերապատրաստման ուղղություն են բժիշկների և վիրաբուժական թիմերի համար, որոնց անհրաժեշտ է կառուցվածքային կրթություն տրավմայի և ժամանակակրիտիկ որոշումների ոլորտում։ Շեշտը դրվում է գործնական ուսուցման վրա՝ առաջնահերթությունների ճանաչում սթրեսի պայմաններում, damage control սկզբունքների կիրառում և համակարգված թիմային աշխատանք։ Դասընթացների ժամանակացույցը, դասախոսները և գրանցման մանրամասները կհրապարակվեն հաստատվելուց հետո։ Եթե հետագայում ավելանա անկախ ծրագրային կայք, այն կարող է միացվել կենտրոնական կարգավորման ֆայլի միջոցով։",
      ru: "Курсы по Damage Control — направление подготовки ASCEL для врачей и хирургических бригад, которым необходимо структурированное обучение в области травмы и принятия решений в условиях ограниченного времени. Акцент делается на практическом обучении: определении приоритетов в стрессовой ситуации, применении принципов Damage Control и слаженной командной работе. Расписание курсов, состав преподавателей и условия регистрации будут опубликованы после подтверждения. Если впоследствии появится независимый сайт программы, его можно будет подключить через центральный файл конфигурации.",
    },
    image: "/images/program-damage-control.webp",
    gallery: [
      "/images/program-damage-control.webp",
      "/images/capability-team.webp",
      "/images/simulation-center.webp",
    ],
    objectives: [
      {
        en: "Strengthen emergency surgical decision-making in trauma settings.",
        hy: "Ամրապնդել շտապ վիրաբուժական որոշումների կայացումը տրավմայի պայմաններում։",
        ru: "Укреплять навыки принятия решений в экстренной хирургии при травме.",
      },
      {
        en: "Teach damage-control principles as a structured professional competency.",
        hy: "Ուսուցանել damage control սկզբունքները որպես կառուցվածքային մասնագիտական կարողություն։",
        ru: "Преподавать принципы Damage Control как структурированную профессиональную компетенцию.",
      },
      {
        en: "Support team-based training for physicians and related clinical staff.",
        hy: "Աջակցել թիմային վերապատրաստմանը բժիշկների և հարակից կլինիկական անձնակազմի համար։",
        ru: "Поддерживать командную подготовку врачей и смежного клинического персонала.",
      },
    ],
    activities: [
      {
        en: "Scenario-based teaching in trauma and emergency decision-making.",
        hy: "Սցենարային ուսուցում տրավմայի և շտապ որոշումների ոլորտում։",
        ru: "Сценарное обучение в области травмы и принятия решений в неотложных ситуациях.",
      },
      {
        en: "Practical workshops connected to ASCEL’s simulation environment.",
        hy: "Գործնական արհեստանոցներ՝ կապված ASCEL-ի սիմուլյացիոն միջավայրի հետ։",
        ru: "Практические семинары, связанные с симуляционной средой ASCEL.",
      },
      {
        en: "Professional education modules for surgical and emergency teams.",
        hy: "Մասնագիտական կրթական մոդուլներ վիրաբուժական և շտապ օգնության թիմերի համար։",
        ru: "Профессиональные образовательные модули для хирургических бригад и команд неотложной помощи.",
      },
    ],
    impact: [
      {
        en: "Verified course outcomes and participation figures will be added when available.",
        hy: "Հաստատված արդյունքներն ու մասնակցության թվերը կավելացվեն, երբ հասանելի լինեն։",
        ru: "Подтверждённые результаты курсов и данные об участии будут добавлены, когда они появятся.",
      },
    ],
    externalUrlKey: "damageControlCourses",
    ctaLabel: "exploreCourses",
  },
  {
    id: "eternal-nation",
    slug: "eternal-nation",
    title: {
      en: "Eternal Nation Foundation",
      hy: "Eternal Nation հիմնադրամ",
      ru: "Фонд Eternal Nation",
    },
    shortTitle: {
      en: "Eternal Nation Foundation",
      hy: "Eternal Nation հիմնադրամ",
      ru: "Фонд Eternal Nation",
    },
    category: {
      en: "Partner Foundation",
      hy: "Գործընկեր հիմնադրամ",
      ru: "Партнёрский фонд",
    },
    description: {
      en: "A partner foundation committed to restorative healthcare for injured Armenians, raising standards of medical care in Armenia, and supporting education in advanced medicine and surgery.",
      hy: "Գործընկեր հիմնադրամ, որի առաքելությունն է վիրավոր հայերի վերականգնողական առողջապահությունը, Հայաստանում բժշկական խնամքի չափանիշների բարձրացումը և առաջադեմ բժշկության ու վիրաբուժության կրթության աջակցումը։",
      ru: "Партнёрский фонд, деятельность которого направлена на восстановительную медицинскую помощь пострадавшим армянам, повышение стандартов медицинской помощи в Армении и поддержку образования в области передовой медицины и хирургии.",
    },
    overview: {
      en: "Eternal Nation Foundation is an independent organization. It is not the same legal entity as ASCEL. ASCEL presents the Foundation as an important partner and related direction in an ecosystem of medical education, healthcare, rehabilitation, and support. According to its official website, the Foundation is committed to rebuilding the lives of injured Armenians through restorative healthcare services, elevating standards of medical care in Armenia, and creating a center of advanced medicine and surgery for patient care and education.",
      hy: "Eternal Nation հիմնադրամը անկախ կազմակերպություն է։ Այն ASCEL-ի հետ նույն իրավաբանական անձը չէ։ ASCEL-ը հիմնադրամը ներկայացնում է որպես կարևոր գործընկեր և հարակից ուղղություն բժշկական կրթության, առողջապահության, վերականգնման և աջակցության միջավայրում։ Ըստ պաշտոնական կայքի՝ հիմնադրամը նվիրված է վիրավոր հայերի կյանքի վերականգնմանը վերականգնողական առողջապահական ծառայությունների միջոցով, Հայաստանում բժշկական խնամքի չափանիշների բարձրացմանը և առաջադեմ բժշկության ու վիրաբուժության կենտրոնի ստեղծմանը՝ հիվանդների խնամքի և կրթության համար։",
      ru: "Фонд Eternal Nation — независимая организация. Это не одно юридическое лицо с ASCEL. ASCEL представляет Фонд как важного партнёра и смежное направление в экосистеме медицинского образования, здравоохранения, реабилитации и поддержки. Согласно официальному сайту, Фонд занимается восстановлением жизни пострадавших армян через услуги восстановительной медицины, повышением стандартов медицинской помощи в Армении и созданием центра передовой медицины и хирургии для лечения пациентов и образования.",
    },
    relationshipNote: {
      en: "Eternal Nation Foundation maintains its own official website. The presentation on this page is an ASCEL overview of the relationship and shared educational context. It is not a copy of the Foundation’s site.",
      hy: "Eternal Nation հիմնադրամն ունի սեփական պաշտոնական կայք։ Այս էջի նյութը ASCEL-ի կողմից հարաբերության և ընդհանուր կրթական համատեքստի ակնարկ է, ոչ թե հիմնադրամի կայքի պատճեն։",
      ru: "У Фонда Eternal Nation есть собственный официальный сайт. Материал на этой странице — обзор ASCEL о партнёрстве и общем образовательном контексте, а не копия сайта Фонда.",
    },
    image: "/images/program-eternal-nation.webp",
    gallery: [
      "/images/program-eternal-nation.webp",
      "/images/donate-support.webp",
      "/images/about-intro.webp",
    ],
    objectives: [
      {
        en: "Rebuild the lives of injured Armenians through restorative healthcare services.",
        hy: "Վերականգնել վիրավոր հայերի կյանքը վերականգնողական առողջապահական ծառայությունների միջոցով։",
        ru: "Восстанавливать жизнь пострадавших армян через услуги восстановительной медицины.",
      },
      {
        en: "Elevate standards of medical care in Armenia.",
        hy: "Բարձրացնել բժշկական խնամքի չափանիշները Հայաստանում։",
        ru: "Повышать стандарты медицинской помощи в Армении.",
      },
      {
        en: "Support a center of advanced medicine and surgery for patient care and education.",
        hy: "Աջակցել առաջադեմ բժշկության և վիրաբուժության կենտրոնին՝ հիվանդների խնամքի և կրթության համար։",
        ru: "Поддерживать центр передовой медицины и хирургии для лечения пациентов и образования.",
      },
    ],
    activities: [
      {
        en: "Restorative healthcare and rehabilitation-related initiatives, as described by the Foundation.",
        hy: "Վերականգնողական առողջապահության և վերականգնման հետ կապված նախաձեռնություններ՝ ըստ հիմնադրամի նկարագրության։",
        ru: "Инициативы в области восстановительной медицины и реабилитации — согласно описанию Фонда.",
      },
      {
        en: "Educational seminars for doctors and students.",
        hy: "Կրթական սեմինարներ բժիշկների և ուսանողների համար։",
        ru: "Образовательные семинары для врачей и студентов.",
      },
      {
        en: "Work connected to medical education, equipment support, and advanced surgical care.",
        hy: "Աշխատանք բժշկական կրթության, սարքավորումների աջակցության և առաջադեմ վիրաբուժական խնամքի ուղղությամբ։",
        ru: "Работа в сфере медицинского образования, поддержки оборудованием и передовой хирургической помощи.",
      },
    ],
    impact: [
      {
        en: "ASCEL does not republish the Foundation’s financial or case figures here. Please visit the official website for current information.",
        hy: "ASCEL-ը այստեղ չի վերահրապարակում հիմնադրամի ֆինանսական կամ դեպքերի թվերը։ Ընթացիկ տեղեկության համար այցելեք պաշտոնական կայք։",
        ru: "ASCEL не воспроизводит здесь финансовые показатели или статистику случаев Фонда. Актуальную информацию смотрите на официальном сайте.",
      },
    ],
    externalUrlKey: "eternalNation",
    ctaLabel: "learnMore",
  },
];

export function getPrograms() {
  return programs;
}

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}

/**
 * Programs that carry a full profile on this site are linked internally; the
 * external site is then surfaced from the detail page itself. Programs without
 * a profile still link straight out to their own website when they have one.
 */
export function getProgramHref(program: Program, localePath = "") {
  const prefix = localePath ? `${localePath}` : "";
  const internal = {
    href: `${prefix}/programs/${program.slug}`,
    external: false as const,
  };

  if (program.detail) return internal;

  const external = getExternalUrl(program.externalUrlKey);
  if (external) {
    return { href: external, external: true as const };
  }
  return internal;
}
