import type { Course } from "@/types";

const courses: Course[] = [
  {
    id: "simulation-fundamentals",
    slug: "simulation-fundamentals",
    title: {
      en: "Fundamentals of Medical Simulation",
      hy: "Բժշկական սիմուլյացիայի հիմունքներ",
      ru: "Основы медицинской симуляции",
    },
    date: {
      en: "Date to be announced",
      hy: "Ամսաթիվը կհայտարարվի",
      ru: "Дата будет объявлена",
    },
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
      ru: "Гюмри, Армения",
    },
    type: {
      en: "Simulation Training",
      hy: "Սիմուլյացիոն ուսուցում",
      ru: "Симуляционная подготовка",
    },
    instructor: {
      en: "[Content to be provided]",
      hy: "[Բովանդակությունը կտրամադրվի]",
      ru: "[Содержание будет предоставлено]",
    },
    description: {
      en: "An introductory course on simulation-based learning for physicians and medical professionals. Faculty, dates, and registration will be published when confirmed.",
      hy: "Ներածական դասընթաց սիմուլյացիայի վրա հիմնված ուսուցման վերաբերյալ՝ բժիշկների և բժշկական մասնագետների համար։ Դասախոսները, ամսաթվերը և գրանցումը կհրապարակվեն հաստատվելուց հետո։",
      ru: "Вводный курс по симуляционному обучению для врачей и медицинских специалистов. Состав преподавателей, даты и регистрация будут опубликованы после подтверждения.",
    },
    image: "/images/capability-simulation.jpg",
    registrationUrl: "",
    isPlaceholder: true,
  },
  {
    id: "team-based-emergency",
    slug: "team-based-emergency",
    title: {
      en: "Team-Based Emergency Scenarios",
      hy: "Թիմային շտապ սցենարներ",
      ru: "Командные сценарии неотложной помощи",
    },
    date: {
      en: "Date to be announced",
      hy: "Ամսաթիվը կհայտարարվի",
      ru: "Дата будет объявлена",
    },
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
      ru: "Гюмри, Армения",
    },
    type: {
      en: "Team Training",
      hy: "Թիմային ուսուցում",
      ru: "Командное обучение",
    },
    instructor: {
      en: "[Content to be provided]",
      hy: "[Բովանդակությունը կտրամադրվի]",
      ru: "[Содержание будет предоставлено]",
    },
    description: {
      en: "A placeholder module for coordinated team training in emergency scenarios. This sample listing will be replaced with confirmed course information.",
      hy: "Նախնական մոդուլ թիմային ուսուցման համար շտապ սցենարներում։ Այս օրինակելի գրառումը կփոխարինվի հաստատված դասընթացի տեղեկությամբ։",
      ru: "Предварительный модуль согласованной командной подготовки в сценариях неотложной помощи. Эта примерная запись будет заменена подтверждённой информацией о курсе.",
    },
    image: "/images/capability-team.jpg",
    registrationUrl: "",
    isPlaceholder: true,
  },
  {
    id: "procedural-skills",
    slug: "procedural-skills",
    title: {
      en: "Procedural Skills Laboratory",
      hy: "Պրոցեդուրային հմտությունների լաբորատորիա",
      ru: "Лаборатория манипуляционных навыков",
    },
    date: {
      en: "Date to be announced",
      hy: "Ամսաթիվը կհայտարարվի",
      ru: "Дата будет объявлена",
    },
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
      ru: "Гюмри, Армения",
    },
    type: {
      en: "Skills Lab",
      hy: "Հմտությունների լաբորատորիա",
      ru: "Лаборатория навыков",
    },
    instructor: {
      en: "[Content to be provided]",
      hy: "[Բովանդակությունը կտրամադրվի]",
      ru: "[Содержание будет предоставлено]",
    },
    description: {
      en: "A sample listing for supervised procedural-skills practice in a simulation environment. Confirmed dates and instructors will replace this placeholder.",
      hy: "Օրինակելի գրառում սիմուլյացիոն միջավայրում վերահսկվող պրոցեդուրային հմտությունների պարապմունքի համար։ Հաստատված ամսաթվերն ու դասախոսները կփոխարինեն այս նախնական նյութը։",
      ru: "Примерная запись о контролируемой отработке манипуляционных навыков в симуляционной среде. Подтверждённые даты и преподаватели заменят этот предварительный материал.",
    },
    image: "/images/program-orthopedic.jpg",
    registrationUrl: "",
    isPlaceholder: true,
  },
];

export function getCourses() {
  return courses;
}

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
