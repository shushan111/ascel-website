import type { LocalizedString } from "@/types";

/**
 * Trust signals: who the legal entity is, who controls the money, and how
 * spending is reported. Every field is null until the client supplies the
 * real document — nothing here is drafted, because a legal status cannot be
 * a draft. `TrustPanel` renders only the rows that are filled in, and
 * removes itself entirely when none are.
 */
export interface TrustFact {
  id: string;
  label: LocalizedString;
  /** The confirmed value, or null while it is still missing. */
  value: LocalizedString | null;
}

export const trustFacts: TrustFact[] = [
  {
    id: "legal-entity",
    label: {
      hy: "Իրավաբանական անձ",
      en: "Legal entity",
      ru: "Юридическое лицо",
    },
    value: null,
  },
  {
    id: "registration",
    label: {
      hy: "Գրանցման համար",
      en: "Registration number",
      ru: "Регистрационный номер",
    },
    value: null,
  },
  {
    id: "governance",
    label: {
      hy: "Ո՞վ է տնօրինում միջոցները",
      en: "Who controls the funds",
      ru: "Кто распоряжается средствами",
    },
    value: null,
  },
  {
    id: "reporting",
    label: {
      hy: "Հաշվետվություն",
      en: "Reporting",
      ru: "Отчётность",
    },
    value: null,
  },
  {
    id: "monument-status",
    label: {
      hy: "Հուշարձանի կարգավիճակ",
      en: "Monument status",
      ru: "Статус памятника",
    },
    value: null,
  },
];

/** Only the facts that carry a confirmed value. */
export function getTrustFacts(): TrustFact[] {
  return trustFacts.filter((fact) => fact.value !== null);
}
