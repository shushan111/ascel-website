import type { EventItem } from "@/types";

const events: EventItem[] = [
  {
    id: "simulation-workshop",
    slug: "simulation-workshop",
    title: {
      en: "Medical Simulation Workshop",
      hy: "Բժշկական սիմուլյացիայի արհեստանոց",
    },
    month: { en: "TBD", hy: "Շուտով" },
    day: "—",
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
    },
    description: {
      en: "A sample event listing for a forthcoming simulation workshop. Date, faculty, and registration will be published when confirmed.",
      hy: "Օրինակելի միջոցառման գրառում՝ սպասվող սիմուլյացիոն արհեստանոցի համար։ Ամսաթիվը, դասախոսները և գրանցումը կհրապարակվեն հաստատվելուց հետո։",
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
    },
    month: { en: "TBD", hy: "Շուտով" },
    day: "—",
    location: {
      en: "Location to be announced",
      hy: "Վայրը կհայտարարվի",
    },
    description: {
      en: "Placeholder for a professional forum on simulation-based medical education and international collaboration.",
      hy: "Նախնական գրառում մասնագիտական ֆորումի համար՝ սիմուլյացիայի վրա հիմնված բժշկական կրթության և միջազգային համագործակցության թեմայով։",
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
    },
    month: { en: "TBD", hy: "Շուտով" },
    day: "—",
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
    },
    description: {
      en: "A sample listing for a future open session introducing the simulation environment to medical professionals.",
      hy: "Օրինակելի գրառում ապագա բաց պարապմունքի համար, որի նպատակն է բժշկական մասնագետներին ծանոթացնել սիմուլյացիոն միջավայրին։",
    },
    href: "/simulation-center",
    isPlaceholder: true,
  },
];

export function getEvents() {
  return events;
}
