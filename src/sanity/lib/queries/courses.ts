import { defineQuery } from "next-sanity";

const courseFields = `
  _id,
  "slug": slug.current,
  status,
  title,
  type,
  date,
  location,
  instructor,
  description,
  registrationUrl,
  sourceUrl,
  body,
  image {
    asset->{ _id, url },
    alt,
    hotspot,
    crop
  },
  gallery[] {
    asset->{ _id, url },
    alt,
    hotspot,
    crop
  }
`;

export const coursesQuery = defineQuery(`*[
  _type == "course" &&
  !(_id in path("drafts.**"))
] | order(status asc, _createdAt desc) {${courseFields}}`);

export const courseBySlugQuery = defineQuery(`*[
  _type == "course" &&
  slug.current == $slug &&
  !(_id in path("drafts.**"))
][0] {${courseFields}}`);
