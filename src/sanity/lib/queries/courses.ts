import { defineQuery } from "next-sanity";

export const coursesQuery = defineQuery(`*[
  _type == "course" &&
  !(_id in path("drafts.**"))
] | order(_createdAt desc) {
  _id,
  title,
  type,
  date,
  location,
  instructor,
  description,
  registrationUrl,
  image {
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  }
}`);
