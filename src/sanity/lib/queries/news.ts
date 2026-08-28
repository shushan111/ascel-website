import { defineQuery } from "next-sanity";

export const newsArticlesQuery = defineQuery(`*[
  _type == "news" &&
  !(_id in path("drafts.**"))
] | order(date desc) {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  body,
  date,
  category,
  image {
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  }
}`);
