import type { EventItem } from "@/types";

const events: EventItem[] = [
  {
    id: "simulation-workshop",
    slug: "simulation-workshop",
    title: {
      en: "Medical Simulation Workshop",
      hy: "Բժշկական սիմուլյացիայի արհեստանոց",
      ru: "Семинар по медицинской симуляции",
    },
    month: { en: "TBD", hy: "Շուտով", ru: "Скоро" },
    day: "—",
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
      ru: "Гюмри, Армения",
    },
    description: {
      en: "A sample event listing for a forthcoming simulation workshop. Date, faculty, and registration will be published when confirmed.",
      hy: "Օրինակելի միջոցառման գրառում՝ սպասվող սիմուլյացիոն արհեստանոցի համար։ Ամսաթիվը, դասախոսները և գրանցումը կհրապարակվեն հաստատվելուց հետո։",
      ru: "Примерная запись о предстоящем симуляционном семинаре. Дата, преподаватели и регистрация будут опубликованы после подтверждения.",
    },
    href: "/courses",
    isPlaceholder: true,
  },
  {
    id: "professional-forum",
    slug: "professional-forum",
    title: {
      en: "Professional Education Forum",
      hy: "Մասնագիտական կրթության ֆորում",
      ru: "Форум профессионального образования",
    },
    month: { en: "TBD", hy: "Շուտով", ru: "Скоро" },
    day: "—",
    location: {
      en: "Location to be announced",
      hy: "Վայրը կհայտարարվի",
      ru: "Место будет объявлено",
    },
    description: {
      en: "Placeholder for a professional forum on simulation-based medical education and international collaboration.",
      hy: "Նախնական գրառում մասնագիտական ֆորումի համար՝ սիմուլյացիայի վրա հիմնված բժշկական կրթության և միջազգային համագործակցության թեմայով։",
      ru: "Предварительная запись о профессиональном форуме по симуляционному медицинскому образованию и международному сотрудничеству.",
    },
    href: "/news",
    isPlaceholder: true,
  },
  {
    id: "open-center-day",
    slug: "open-center-day",
    title: {
      en: "Simulation Center Open Session",
      hy: "Սիմուլյացիոն կենտրոնի բաց պարապմունք",
      ru: "Открытое занятие симуляционного центра",
    },
    month: { en: "TBD", hy: "Շուտով", ru: "Скоро" },
    day: "—",
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
      ru: "Гюмри, Армения",
    },
    description: {
      en: "A sample listing for a future open session introducing the simulation environment to doctors.",
      hy: "Օրինակելի գրառում ապագա բաց պարապմունքի համար, որի նպատակն է բժիշկներին ծանոթացնել սիմուլյացիոն միջավայրին։",
      ru: "Примерная запись о будущем открытом занятии, цель которого — познакомить врачей с симуляционной средой.",
    },
    href: "/simulation-center",
    isPlaceholder: true,
  },
];

export function getEvents() {
  return events;
}
