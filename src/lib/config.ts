export const siteConfig = {
  name: "ASCEL",
  legalName: "Armenian Simulation Center for Experimental Learning",
  shortDescription:
    "Medical education, simulation-based training, and experimental learning in Armenia.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  localeDefault: "en" as const,
  contact: {
    email: "[Content to be provided]",
    phone: "[Content to be provided]",
    addressLine: "Gyumri, Armenia",
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

export const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/courses", key: "courses" },
  { href: "/simulation-center", key: "simulation" },
  { href: "/news", key: "news" },
  { href: "/donate", key: "donate" },
  { href: "/contact", key: "contact" },
] as const;

export const footerNav = [
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/courses", key: "courses" },
  { href: "/news", key: "news" },
  { href: "/donate", key: "donate" },
  { href: "/contact", key: "contact" },
] as const;
