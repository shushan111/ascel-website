import { defineQuery } from "next-sanity";

const localizedFields = `{
  en,
  hy,
  ru
}`;

/**
 * Active founders that actually carry a photo, in the order the Studio shows
 * them: the Order field first, creation date as the tie-breaker.
 */
export const foundersQuery = defineQuery(`*[
  _type == "founder" &&
  !(_id in path("drafts.**")) &&
  isActive != false &&
  defined(photo.asset)
] | order(order asc, _createdAt asc) {
  _id,
  firstName ${localizedFields},
  lastName ${localizedFields},
  role ${localizedFields},
  bio ${localizedFields},
  photo {
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  }
}`);
