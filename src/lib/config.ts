export const siteConfig = {
  name: "ASCEL",
  legalName: "Gyumri Medical Training Center",
  shortDescription:
    "A 19th-century monument in Gyumri, restored and rebuilt as a medical training center.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  localeDefault: "en" as const,
  contact: {
    email: "[Content to be provided]",
    phone: "[Content to be provided]",
    addressLine: "20-22 Myasnikyan St., Gyumri, Armenia",
    addressDetail: "[Content to be provided]",
    mapEmbedUrl: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  contactFormEndpoint: process.env.CONTACT_FORM_ENDPOINT ?? "",
};

export const externalLinks = {
  gyumriOrthopedicSchool: "https://gyumriorthoschool.org/",
  damageControlCourses: "",
  eternalNation: "https://eternalnation.com/",
} as const;

export const donationConfig = {
  providerUrl: process.env.NEXT_PUBLIC_DONATION_URL ?? "",
  providerName: process.env.NEXT_PUBLIC_DONATION_PROVIDER ?? "",
};

// The path a visitor is offered: who we are → the work (programmes, courses)
// → what the work has led to (the project) → news → contact. Home is the
// logo; Donate is the separate bronze CTA beside the nav, never a nav link.
// `shortKey` is the label the desktop row uses where the full one is long.
export const navItems = [
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/courses", key: "courses" },
  { href: "/simulation-center", key: "simulation", shortKey: "simulationShort" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export const footerNav = [
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/courses", key: "courses" },
  { href: "/simulation-center", key: "simulation" },
  { href: "/news", key: "news" },
  { href: "/donate", key: "donate" },
  { href: "/contact", key: "contact" },
] as const;
