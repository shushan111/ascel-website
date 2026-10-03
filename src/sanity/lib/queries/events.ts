import { defineQuery } from "next-sanity";

export const eventsQuery = defineQuery(`*[
  _type == "event" &&
  !(_id in path("drafts.**"))
] {
  _id,
  title,
  date,
  month,
  day,
  location,
  description,
  href
}`);
