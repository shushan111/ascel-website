import type { DonationOption } from "@/types";

export const donationOptions: DonationOption[] = [
  {
    id: "education",
    title: { en: "Medical Education", hy: "Բժշկական կրթություն" },
    description: {
      en: "Help expand structured learning for physicians and medical professionals.",
      hy: "Օգնեք ընդլայնել կառուցվածքային ուսուցումը բժիշկների և բժշկական մասնագետների համար։",
    },
  },
  {
    id: "simulation",
    title: { en: "Simulation Training", hy: "Սիմուլյացիոն ուսուցում" },
    description: {
      en: "Support simulation-based practice in a controlled educational environment.",
      hy: "Աջակցեք սիմուլյացիայի վրա հիմնված պարապմունքին վերահսկվող կրթական միջավայրում։",
    },
  },
  {
    id: "equipment",
    title: { en: "Equipment", hy: "Սարքավորումներ" },
    description: {
      en: "Contribute to training equipment and learning infrastructure as needs are confirmed.",
      hy: "Նպաստեք ուսուցման սարքավորումներին և ենթակառուցվածքին՝ ըստ հաստատված կարիքների։",
    },
  },
  {
    id: "scholarships",
    title: { en: "Scholarships", hy: "Կրթաթոշակներ" },
    description: {
      en: "A future category for expanding access to professional courses.",
      hy: "Ապագա ուղղություն՝ մասնագիտական դասընթացների հասանելիությունն ընդլայնելու համար։",
    },
  },
  {
    id: "research",
    title: { en: "Research", hy: "Հետազոտություն" },
    description: {
      en: "Support educational research connected to simulation and experimental learning.",
      hy: "Աջակցեք սիմուլյացիայի և փորձարարական ուսուցման հետ կապված կրթական հետազոտությանը։",
    },
  },
  {
    id: "community",
    title: { en: "Community Programs", hy: "Համայնքային ծրագրեր" },
    description: {
      en: "Help related community and healthcare education initiatives as they are defined.",
      hy: "Աջակցեք հարակից համայնքային և առողջապահական կրթական նախաձեռնություններին՝ ըստ դրանց սահմանման։",
    },
  },
];

export function getDonationOptions() {
  return donationOptions;
}
