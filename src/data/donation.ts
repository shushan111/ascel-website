import type { DonationOption } from "@/types";

export const donationOptions: DonationOption[] = [
  {
    id: "education",
    title: { en: "Medical Education", hy: "Բժշկական կրթություն", ru: "Медицинское образование" },
    description: {
      en: "Help expand structured learning for doctors and students.",
      hy: "Օգնեք ընդլայնել կառուցվածքային ուսուցումը բժիշկների և ուսանողների համար։",
      ru: "Помогите расширить структурированное обучение для врачей и студентов.",
    },
  },
  {
    id: "simulation",
    title: { en: "Simulation Training", hy: "Սիմուլյացիոն ուսուցում", ru: "Симуляционная подготовка" },
    description: {
      en: "Support simulation-based practice in a controlled educational environment.",
      hy: "Աջակցեք սիմուլյացիայի վրա հիմնված պարապմունքին վերահսկվող կրթական միջավայրում։",
      ru: "Поддержите симуляционную практику в контролируемой образовательной среде.",
    },
  },
  {
    id: "equipment",
    title: { en: "Equipment", hy: "Սարքավորումներ", ru: "Оборудование" },
    description: {
      en: "Contribute to training equipment and learning infrastructure as needs are confirmed.",
      hy: "Նպաստեք ուսուցման սարքավորումներին և ենթակառուցվածքին՝ ըստ հաստատված կարիքների։",
      ru: "Внесите вклад в учебное оборудование и инфраструктуру по мере подтверждения потребностей.",
    },
  },
  {
    id: "scholarships",
    title: { en: "Scholarships", hy: "Կրթաթոշակներ", ru: "Стипендии" },
    description: {
      en: "A future category for expanding access to professional courses.",
      hy: "Ապագա ուղղություն՝ մասնագիտական դասընթացների հասանելիությունն ընդլայնելու համար։",
      ru: "Будущее направление для расширения доступа к профессиональным курсам.",
    },
  },
  {
    id: "research",
    title: { en: "Research", hy: "Հետազոտություն", ru: "Исследования" },
    description: {
      en: "Support educational research connected to simulation and experimental learning.",
      hy: "Աջակցեք սիմուլյացիայի և փորձարարական ուսուցման հետ կապված կրթական հետազոտությանը։",
      ru: "Поддержите образовательные исследования, связанные с симуляцией и экспериментальным обучением.",
    },
  },
  {
    id: "community",
    title: { en: "Community Programs", hy: "Համայնքային ծրագրեր", ru: "Общественные программы" },
    description: {
      en: "Help related community and healthcare education initiatives as they are defined.",
      hy: "Աջակցեք հարակից համայնքային և առողջապահական կրթական նախաձեռնություններին՝ ըստ դրանց սահմանման։",
      ru: "Поддержите смежные общественные и образовательные инициативы в сфере здравоохранения по мере их определения.",
    },
  },
];

export function getDonationOptions() {
  return donationOptions;
}
