import type { NewsArticle } from "@/types";

const articles: NewsArticle[] = [
  {
    id: "ascel-introduction",
    slug: "introducing-ascel",
    title: {
      en: "Introducing the Armenian Simulation Center for Experimental Learning",
      hy: "Ներկայացնում ենք Փորձարարական ուսուցման հայկական սիմուլյացիոն կենտրոնը",
      ru: "Представляем Армянский симуляционный центр экспериментального обучения",
    },
    excerpt: {
      en: "ASCEL is being developed in Gyumri as a medical simulation center for experimental learning and professional training. This sample article will be replaced with confirmed news.",
      hy: "ASCEL-ը ստեղծվում է Գյումրիում՝ որպես բժշկական սիմուլյացիոն կենտրոն փորձարարական ուսուցման և մասնագիտական վերապատրաստման համար։ Այս օրինակելի հոդվածը կփոխարինվի հաստատված նորությամբ։",
      ru: "ASCEL создаётся в Гюмри как медицинский симуляционный центр экспериментального обучения и профессиональной подготовки. Этот примерный материал будет заменён подтверждённой новостью.",
    },
    body: [
      {
        en: "This is placeholder news content. ASCEL is being established in Gyumri to provide an environment for simulation-based medical education, experimental learning, and professional development.",
        hy: "Սա նախնական նորության բովանդակություն է։ ASCEL-ը ստեղծվում է Գյումրիում՝ սիմուլյացիայի վրա հիմնված բժշկական կրթության, փորձարարական ուսուցման և մասնագիտական զարգացման միջավայր ապահովելու համար։",
        ru: "Это предварительный новостной материал. ASCEL создаётся в Гюмри, чтобы обеспечить среду для симуляционного медицинского образования, экспериментального обучения и профессионального развития.",
      },
      {
        en: "Public project descriptions note the intended use of high-fidelity mannequins, virtual reality, robotics, and other experimental learning methods. Confirmed updates, dates, and announcements will replace this sample article.",
        hy: "Հանրային նախագծային նկարագրություններում նշվում է բարձր հավաստիության մանեկենների, վիրտուալ իրականության, ռոբոտաշինության և փորձարարական ուսուցման այլ մեթոդների կիրառումը։ Հաստատված թարմացումները կփոխարինեն այս օրինակելի հոդվածը։",
        ru: "В публичных описаниях проекта отмечается планируемое использование высокореалистичных манекенов, виртуальной реальности, робототехники и других методов экспериментального обучения. Подтверждённые обновления, даты и объявления заменят этот примерный материал.",
      },
    ],
    date: "2025-01-01",
    dateLabel: { en: "Sample article", hy: "Օրինակելի հոդված", ru: "Пример статьи" },
    category: { en: "Center", hy: "Կենտրոն", ru: "Центр" },
    image: "/images/hero-simulation.webp",
    imageAlt: {
      en: "Medical simulation training environment",
      hy: "Բժշկական սիմուլյացիոն ուսուցման միջավայր",
      ru: "Среда медицинской симуляционной подготовки",
    },
    isPlaceholder: true,
  },
  {
    id: "active-programs",
    slug: "active-programs-overview",
    title: {
      en: "Active programs: education, training, and partnership",
      hy: "Գործող ծրագրեր. կրթություն, վերապատրաստում և գործընկերություն",
      ru: "Действующие программы: образование, подготовка и партнёрство",
    },
    excerpt: {
      en: "ASCEL’s current program landscape includes Gyumri Orthopedic School, Damage Control Courses, and a partnership presentation of Eternal Nation Foundation.",
      hy: "ASCEL-ի ընթացիկ ծրագրային դաշտում են Գյումրու օրթոպեդիական դպրոցը, Damage Control դասընթացները և Eternal Nation հիմնադրամի գործընկերային ներկայացումը։",
      ru: "В текущем программном контуре ASCEL — Гюмрийская ортопедическая школа, курсы по Damage Control и партнёрское представление Фонда Eternal Nation.",
    },
    body: [
      {
        en: "This sample update describes how ASCEL groups related educational and healthcare initiatives under one institutional platform while keeping each program distinct.",
        hy: "Այս օրինակելի թարմացումը նկարագրում է, թե ինչպես է ASCEL-ը միավորում հարակից կրթական և առողջապահական նախաձեռնությունները մեկ հարթակի ներքո՝ պահպանելով յուրաքանչյուր ծրագրի առանձնահատկությունը։",
        ru: "Этот примерный материал описывает, как ASCEL объединяет смежные образовательные и медицинские инициативы на одной институциональной платформе, сохраняя самостоятельность каждой программы.",
      },
      {
        en: "Gyumri Orthopedic School and Eternal Nation Foundation each maintain official websites. Damage Control Courses is presented as an internal training direction until an external URL is provided.",
        hy: "Գյումրու օրթոպեդիական դպրոցը և Eternal Nation հիմնադրամը ունեն պաշտոնական կայքեր։ Damage Control դասընթացները ներկայացվում են որպես ներքին վերապատրաստման ուղղություն, մինչև արտաքին հղում տրամադրվի։",
        ru: "У Гюмрийской ортопедической школы и Фонда Eternal Nation есть официальные сайты. Курсы по Damage Control представлены как внутреннее направление подготовки до появления внешней ссылки.",
      },
    ],
    date: "2025-01-02",
    dateLabel: { en: "Sample article", hy: "Օրինակելի հոդված", ru: "Пример статьи" },
    category: { en: "Programs", hy: "Ծրագրեր", ru: "Программы" },
    image: "/images/news-education.webp",
    imageAlt: {
      en: "Medical education workshop setting",
      hy: "Բժշկական կրթական արհեստանոցի միջավայր",
      ru: "Среда образовательного семинара по медицине",
    },
    isPlaceholder: true,
  },
  {
    id: "simulation-learning",
    slug: "learn-by-doing",
    title: {
      en: "Learn by doing: the role of simulation in medical education",
      hy: "Սովորել գործելով. սիմուլյացիայի դերը բժշկական կրթության մեջ",
      ru: "Учиться на практике: роль симуляции в медицинском образовании",
    },
    excerpt: {
      en: "Simulation-based education gives physicians a controlled setting to practice procedures, emergency scenarios, and team communication before encountering equivalent clinical complexity.",
      hy: "Սիմուլյացիայի վրա հիմնված կրթությունը բժիշկներին տալիս է վերահսկվող միջավայր՝ պրոցեդուրաներ, շտապ սցենարներ և թիմային հաղորդակցություն վարժեցնելու համար՝ մինչև համարժեք կլինիկական բարդության հանդիպելը։",
      ru: "Симуляционное образование даёт врачам контролируемую среду для отработки манипуляций, сценариев неотложной помощи и командной коммуникации до встречи с сопоставимой клинической сложностью.",
    },
    body: [
      {
        en: "This placeholder article outlines the educational logic behind ASCEL’s simulation environment. It is not a news announcement of a completed facility milestone.",
        hy: "Այս նախնական հոդվածը ուրվագծում է ASCEL-ի սիմուլյացիոն միջավայրի կրթական տրամաբանությունը։ Այն ավարտված կառույցի մասին նորություն չէ։",
        ru: "Этот предварительный материал описывает образовательную логику симуляционной среды ASCEL. Это не сообщение о завершённом этапе строительства.",
      },
      {
        en: "Intended learning areas include medical simulation, surgical training, emergency scenarios, team-based training, procedural skills, and experimental learning.",
        hy: "Նախատեսված ուսուցման ոլորտներից են բժշկական սիմուլյացիան, վիրաբուժական ուսուցումը, շտապ սցենարները, թիմային վերապատրաստումը, պրոցեդուրային հմտությունները և փորձարարական ուսուցումը։",
        ru: "Среди предусмотренных направлений обучения — медицинская симуляция, хирургическая подготовка, сценарии неотложной помощи, командное обучение, манипуляционные навыки и экспериментальное обучение.",
      },
    ],
    date: "2025-01-03",
    dateLabel: { en: "Sample article", hy: "Օրինակելի հոդված", ru: "Пример статьи" },
    category: { en: "Education", hy: "Կրթություն", ru: "Образование" },
    image: "/images/simulation-center.webp",
    imageAlt: {
      en: "Medical simulation laboratory interior",
      hy: "Բժշկական սիմուլյացիոն լաբորատորիայի ինտերիեր",
      ru: "Интерьер медицинской симуляционной лаборатории",
    },
    isPlaceholder: true,
  },
  {
    id: "support-mission",
    slug: "supporting-medical-education",
    title: {
      en: "Why support for medical education matters",
      hy: "Ինչու է կարևոր բժշկական կրթության աջակցությունը",
      ru: "Почему важна поддержка медицинского образования",
    },
    excerpt: {
      en: "Support helps expand access to simulation-based training, professional development, and healthcare education initiatives in Armenia. Donation processes will be connected when a provider is confirmed.",
      hy: "Աջակցությունն օգնում է ընդլայնել սիմուլյացիոն ուսուցման, մասնագիտական զարգացման և առողջապահական կրթական նախաձեռնությունների հասանելիությունը Հայաստանում։ Նվիրատվության գործընթացը կմիացվի մատակարարի հաստատումից հետո։",
      ru: "Поддержка помогает расширять доступ к симуляционной подготовке, профессиональному развитию и образовательным инициативам в сфере здравоохранения в Армении. Процесс пожертвований будет подключён после выбора платёжного сервиса.",
    },
    body: [
      {
        en: "This sample article explains the purpose of ASCEL’s support page. It does not report fundraising totals or name donors.",
        hy: "Այս օրինակելի հոդվածը բացատրում է ASCEL-ի աջակցության էջի նպատակը։ Այն չի հաղորդում հանգանակության գումարներ և չի նշում նվիրատուներ։",
        ru: "Этот примерный материал объясняет назначение страницы поддержки ASCEL. В нём нет сумм сборов и имён жертвователей.",
      },
      {
        en: "Possible support categories include medical education, simulation training, equipment, scholarships, research, and community programs. Details will be updated when verified.",
        hy: "Աջակցության հնարավոր ուղղություններից են բժշկական կրթությունը, սիմուլյացիոն ուսուցումը, սարքավորումները, կրթաթոշակները, հետազոտությունը և համայնքային ծրագրերը։ Մանրամասները կթարմացվեն հաստատվելուց հետո։",
        ru: "Среди возможных направлений поддержки — медицинское образование, симуляционная подготовка, оборудование, стипендии, исследования и общественные программы. Подробности будут обновлены после подтверждения.",
      },
    ],
    date: "2025-01-04",
    dateLabel: { en: "Sample article", hy: "Օրինակելի հոդված", ru: "Пример статьи" },
    category: { en: "Support", hy: "Աջակցություն", ru: "Поддержка" },
    image: "/images/donate-support.webp",
    imageAlt: {
      en: "Simulation training equipment prepared in a laboratory",
      hy: "Սիմուլյացիոն ուսուցման սարքավորումներ լաբորատորիայում",
      ru: "Оборудование для симуляционной подготовки в лаборатории",
    },
    isPlaceholder: true,
  },
];

export function getNewsArticles() {
  return articles;
}

export function getNewsBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getLatestNews(limit = 3) {
  return articles.slice(0, limit);
}
