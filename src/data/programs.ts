import type { Program } from "@/types";
import { getExternalUrl } from "@/lib/utils";

const programs: Program[] = [
  {
    id: "gyumri-orthopedic-school",
    slug: "gyumri-orthopedic-school",
    title: {
      en: "Gyumri Orthopedic School",
      hy: "Գյումրու օրթոպեդիական դպրոց",
    },
    shortTitle: {
      en: "Gyumri Orthopedic School",
      hy: "Գյումրու օրթոպեդիական դպրոց",
    },
    category: {
      en: "Educational Program",
      hy: "Կրթական ծրագիր",
    },
    description: {
      en: "An educational program dedicated to making current theoretical and practical knowledge in traumatology and orthopedics more accessible to physicians, through lecture-based teaching and hands-on laboratory work.",
      hy: "Կրթական ծրագիր, որի նպատակն է բժիշկների համար ավելի հասանելի դարձնել տրավմատոլոգիայի և օրթոպեդիայի արդի տեսական ու գործնական գիտելիքը՝ դասախոսությունների և գործնական լաբորատոր աշխատանքի միջոցով։",
    },
    overview: {
      en: "Gyumri Orthopedic School is one of ASCEL’s active educational programs. Courses are taught by practicing physicians and specialists from Armenia and other countries. Teaching combines focused lecture material with substantial practical sessions using anatomical models and contemporary surgical instrumentation. The program operates through its own official website; ASCEL presents it as part of a shared medical-education ecosystem, without replacing that independent site.",
      hy: "Գյումրու օրթոպեդիական դպրոցը ASCEL-ի գործող կրթական ծրագրերից է։ Դասընթացները վարում են գործող բժիշկներ և մասնագետներ Հայաստանից և այլ երկրներից։ Ուսուցումը համատեղում է կենտրոնացված դասախոսական նյութը գործնական պարապմունքների հետ՝ անատոմիական մոդելների և ժամանակակից վիրաբուժական գործիքների կիրառմամբ։ Ծրագիրն ունի սեփական պաշտոնական կայք։ ASCEL-ը այն ներկայացնում է որպես ընդհանուր բժշկական կրթական միջավայրի մաս՝ առանց փոխարինելու այդ անկախ կայքը։",
    },
    image: "/images/program-orthopedic.jpg",
    gallery: [
      "/images/program-orthopedic.jpg",
      "/images/capability-simulation.jpg",
      "/images/news-education.jpg",
    ],
    objectives: [
      {
        en: "Increase access to current knowledge in traumatology and orthopedics.",
        hy: "Բարձրացնել տրավմատոլոգիայի և օրթոպեդիայի արդի գիտելիքի հասանելիությունը։",
      },
      {
        en: "Combine structured lectures with practical, skills-based laboratory teaching.",
        hy: "Համատեղել կառուցվածքային դասախոսությունները գործնական, հմտությունների վրա հիմնված լաբորատոր ուսուցման հետ։",
      },
      {
        en: "Bring international and local faculty into a shared educational setting.",
        hy: "Միավորել միջազգային և տեղական դասախոսներին ընդհանուր կրթական միջավայրում։",
      },
    ],
    activities: [
      {
        en: "Lecture-practical courses in orthopedic surgery and related nursing education.",
        hy: "Լեկցիոն-գործնական դասընթացներ օրթոպեդիկ վիրաբուժության և հարակից բուժքույրական կրթության ոլորտում։",
      },
      {
        en: "Hands-on sessions using anatomical models and surgical instrumentation.",
        hy: "Գործնական պարապմունքներ անատոմիական մոդելների և վիրաբուժական գործիքների կիրառմամբ։",
      },
      {
        en: "Assessment during courses to review understanding of the material taught.",
        hy: "Դասընթացների ընթացքում գնահատում՝ անցած նյութի յուրացումը ստուգելու համար։",
      },
    ],
    impact: [
      {
        en: "Impact metrics for this program will be published here when verified data is available.",
        hy: "Այս ծրագրի ազդեցության ցուցանիշները կհրապարակվեն այստեղ, երբ հաստատված տվյալները հասանելի լինեն։",
      },
    ],
    externalUrlKey: "gyumriOrthopedicSchool",
    ctaLabel: "visitWebsite",
  },
  {
    id: "damage-control-courses",
    slug: "damage-control-courses",
    title: {
      en: "Damage Control Courses",
      hy: "Damage Control դասընթացներ",
    },
    shortTitle: {
      en: "Damage Control Courses",
      hy: "Damage Control դասընթացներ",
    },
    category: {
      en: "Professional Training",
      hy: "Մասնագիտական վերապատրաստում",
    },
    description: {
      en: "A medical education direction focused on trauma care, damage-control principles, emergency surgical decision-making, and practical professional training.",
      hy: "Բժշկական կրթական ուղղություն, որի կենտրոնում են տրավմայի խնամքը, damage control սկզբունքները, շտապ վիրաբուժական որոշումների կայացումը և գործնական մասնագիտական ուսուցումը։",
    },
    overview: {
      en: "Damage Control Courses is an ASCEL training direction for physicians and surgical teams who need structured education in trauma and time-critical decision-making. The emphasis is on practical learning: recognizing priorities under pressure, applying damage-control principles, and working as a coordinated team. Course schedules, faculty, and registration details will be published when confirmed. If an independent program website is added later, it can be connected through the central configuration file.",
      hy: "Damage Control դասընթացները ASCEL-ի վերապատրաստման ուղղություն են բժիշկների և վիրաբուժական թիմերի համար, որոնց անհրաժեշտ է կառուցվածքային կրթություն տրավմայի և ժամանակակրիտիկ որոշումների ոլորտում։ Շեշտը դրվում է գործնական ուսուցման վրա՝ առաջնահերթությունների ճանաչում սթրեսի պայմաններում, damage control սկզբունքների կիրառում և համակարգված թիմային աշխատանք։ Դասընթացների ժամանակացույցը, դասախոսները և գրանցման մանրամասները կհրապարակվեն հաստատվելուց հետո։ Եթե հետագայում ավելանա անկախ ծրագրային կայք, այն կարող է միացվել կենտրոնական կարգավորման ֆայլի միջոցով։",
    },
    image: "/images/program-damage-control.jpg",
    gallery: [
      "/images/program-damage-control.jpg",
      "/images/capability-team.jpg",
      "/images/simulation-center.jpg",
    ],
    objectives: [
      {
        en: "Strengthen emergency surgical decision-making in trauma settings.",
        hy: "Ամրապնդել շտապ վիրաբուժական որոշումների կայացումը տրավմայի պայմաններում։",
      },
      {
        en: "Teach damage-control principles as a structured professional competency.",
        hy: "Ուսուցանել damage control սկզբունքները որպես կառուցվածքային մասնագիտական կարողություն։",
      },
      {
        en: "Support team-based training for physicians and related clinical staff.",
        hy: "Աջակցել թիմային վերապատրաստմանը բժիշկների և հարակից կլինիկական անձնակազմի համար։",
      },
    ],
    activities: [
      {
        en: "Scenario-based teaching in trauma and emergency decision-making.",
        hy: "Սցենարային ուսուցում տրավմայի և շտապ որոշումների ոլորտում։",
      },
      {
        en: "Practical workshops connected to ASCEL’s simulation environment.",
        hy: "Գործնական արհեստանոցներ՝ կապված ASCEL-ի սիմուլյացիոն միջավայրի հետ։",
      },
      {
        en: "Professional education modules for surgical and emergency teams.",
        hy: "Մասնագիտական կրթական մոդուլներ վիրաբուժական և շտապ օգնության թիմերի համար։",
      },
    ],
    impact: [
      {
        en: "Verified course outcomes and participation figures will be added when available.",
        hy: "Հաստատված արդյունքներն ու մասնակցության թվերը կավելացվեն, երբ հասանելի լինեն։",
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
    },
    shortTitle: {
      en: "Eternal Nation Foundation",
      hy: "Eternal Nation հիմնադրամ",
    },
    category: {
      en: "Partner Foundation",
      hy: "Գործընկեր հիմնադրամ",
    },
    description: {
      en: "A partner foundation committed to restorative healthcare for injured Armenians, raising standards of medical care in Armenia, and supporting education in advanced medicine and surgery.",
      hy: "Գործընկեր հիմնադրամ, որի առաքելությունն է վիրավոր հայերի վերականգնողական առողջապահությունը, Հայաստանում բժշկական խնամքի չափանիշների բարձրացումը և առաջադեմ բժշկության ու վիրաբուժության կրթության աջակցումը։",
    },
    overview: {
      en: "Eternal Nation Foundation is an independent organization. It is not the same legal entity as ASCEL. ASCEL presents the Foundation as an important partner and related direction in an ecosystem of medical education, healthcare, rehabilitation, and support. According to its official website, the Foundation is committed to rebuilding the lives of injured Armenians through restorative healthcare services, elevating standards of medical care in Armenia, and creating a center of advanced medicine and surgery for patient care and education.",
      hy: "Eternal Nation հիմնադրամը անկախ կազմակերպություն է։ Այն ASCEL-ի հետ նույն իրավաբանական անձը չէ։ ASCEL-ը հիմնադրամը ներկայացնում է որպես կարևոր գործընկեր և հարակից ուղղություն բժշկական կրթության, առողջապահության, վերականգնման և աջակցության միջավայրում։ Ըստ պաշտոնական կայքի՝ հիմնադրամը նվիրված է վիրավոր հայերի կյանքի վերականգնմանը վերականգնողական առողջապահական ծառայությունների միջոցով, Հայաստանում բժշկական խնամքի չափանիշների բարձրացմանը և առաջադեմ բժշկության ու վիրաբուժության կենտրոնի ստեղծմանը՝ հիվանդների խնամքի և կրթության համար։",
    },
    relationshipNote: {
      en: "Eternal Nation Foundation maintains its own official website. The presentation on this page is an ASCEL overview of the relationship and shared educational context. It is not a copy of the Foundation’s site.",
      hy: "Eternal Nation հիմնադրամն ունի սեփական պաշտոնական կայք։ Այս էջի նյութը ASCEL-ի կողմից հարաբերության և ընդհանուր կրթական համատեքստի ակնարկ է, ոչ թե հիմնադրամի կայքի պատճեն։",
    },
    image: "/images/program-eternal-nation.jpg",
    gallery: [
      "/images/program-eternal-nation.jpg",
      "/images/donate-support.jpg",
      "/images/about-intro.jpg",
    ],
    objectives: [
      {
        en: "Rebuild the lives of injured Armenians through restorative healthcare services.",
        hy: "Վերականգնել վիրավոր հայերի կյանքը վերականգնողական առողջապահական ծառայությունների միջոցով։",
      },
      {
        en: "Elevate standards of medical care in Armenia.",
        hy: "Բարձրացնել բժշկական խնամքի չափանիշները Հայաստանում։",
      },
      {
        en: "Support a center of advanced medicine and surgery for patient care and education.",
        hy: "Աջակցել առաջադեմ բժշկության և վիրաբուժության կենտրոնին՝ հիվանդների խնամքի և կրթության համար։",
      },
    ],
    activities: [
      {
        en: "Restorative healthcare and rehabilitation-related initiatives, as described by the Foundation.",
        hy: "Վերականգնողական առողջապահության և վերականգնման հետ կապված նախաձեռնություններ՝ ըստ հիմնադրամի նկարագրության։",
      },
      {
        en: "Educational seminars for physicians and medical professionals.",
        hy: "Կրթական սեմինարներ բժիշկների և բժշկական մասնագետների համար։",
      },
      {
        en: "Work connected to medical education, equipment support, and advanced surgical care.",
        hy: "Աշխատանք բժշկական կրթության, սարքավորումների աջակցության և առաջադեմ վիրաբուժական խնամքի ուղղությամբ։",
      },
    ],
    impact: [
      {
        en: "ASCEL does not republish the Foundation’s financial or case figures here. Please visit the official website for current information.",
        hy: "ASCEL-ը այստեղ չի վերահրապարակում հիմնադրամի ֆինանսական կամ դեպքերի թվերը։ Ընթացիկ տեղեկության համար այցելեք պաշտոնական կայք։",
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

export function getProgramHref(program: Program, localePath = "") {
  const external = getExternalUrl(program.externalUrlKey);
  if (external) {
    return { href: external, external: true as const };
  }
  const prefix = localePath ? `${localePath}` : "";
  return {
    href: `${prefix}/programs/${program.slug}`,
    external: false as const,
  };
}
