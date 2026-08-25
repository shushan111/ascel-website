import type { Course } from "@/types";

const courses: Course[] = [
  {
    id: "simulation-fundamentals",
    slug: "simulation-fundamentals",
    title: {
      en: "Fundamentals of Medical Simulation",
      hy: "Բժշկական սիմուլյացիայի հիմունքներ",
    },
    date: {
      en: "Date to be announced",
      hy: "Ամսաթիվը կհայտարարվի",
    },
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
    },
    type: {
      en: "Simulation Training",
      hy: "Սիմուլյացիոն ուսուցում",
    },
    instructor: {
      en: "[Content to be provided]",
      hy: "[Բովանդակությունը կտրամադրվի]",
    },
    description: {
      en: "An introductory course on simulation-based learning for physicians and medical professionals. Faculty, dates, and registration will be published when confirmed.",
      hy: "Ներածական դասընթաց սիմուլյացիայի վրա հիմնված ուսուցման վերաբերյալ՝ բժիշկների և բժշկական մասնագետների համար։ Դասախոսները, ամսաթվերը և գրանցումը կհրապարակվեն հաստատվելուց հետո։",
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
    },
    date: {
      en: "Date to be announced",
      hy: "Ամսաթիվը կհայտարարվի",
    },
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
    },
    type: {
      en: "Team Training",
      hy: "Թիմային ուսուցում",
    },
    instructor: {
      en: "[Content to be provided]",
      hy: "[Բովանդակությունը կտրամադրվի]",
    },
    description: {
      en: "A placeholder module for coordinated team training in emergency scenarios. This sample listing will be replaced with confirmed course information.",
      hy: "Նախնական մոդուլ թիմային ուսուցման համար շտապ սցենարներում։ Այս օրինակելի գրառումը կփոխարինվի հաստատված դասընթացի տեղեկությամբ։",
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
    },
    date: {
      en: "Date to be announced",
      hy: "Ամսաթիվը կհայտարարվի",
    },
    location: {
      en: "Gyumri, Armenia",
      hy: "Գյումրի, Հայաստան",
    },
    type: {
      en: "Skills Lab",
      hy: "Հմտությունների լաբորատորիա",
    },
    instructor: {
      en: "[Content to be provided]",
      hy: "[Բովանդակությունը կտրամադրվի]",
    },
    description: {
      en: "A sample listing for supervised procedural-skills practice in a simulation environment. Confirmed dates and instructors will replace this placeholder.",
      hy: "Օրինակելի գրառում սիմուլյացիոն միջավայրում վերահսկվող պրոցեդուրային հմտությունների պարապմունքի համար։ Հաստատված ամսաթվերն ու դասախոսները կփոխարինեն այս նախնական նյութը։",
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
