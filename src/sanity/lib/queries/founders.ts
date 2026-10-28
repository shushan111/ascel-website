import { defineQuery } from "next-sanity";

const localizedFields = `{
  en,
  hy,
  ru
}`;

/**
 * Active founders in the order the Studio shows them: the Order field first,
 * creation date as the tie-breaker. A founder without an approved portrait is
 * still listed; the page shows their initials.
 */
export const foundersQuery = defineQuery(`*[
  _type == "founder" &&
  !(_id in path("drafts.**")) &&
  isActive != false
] | order(order asc, _createdAt asc) {
  _id,
  firstName ${localizedFields},
  lastName ${localizedFields},
  role ${localizedFields},
  bio ${localizedFields},
  bioExtended ${localizedFields},
  photo {
    asset->{
      _id,
      url
    },
    hotspot,
    crop,
    alt ${localizedFields},
    credit
  }
}`);
