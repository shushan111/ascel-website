import { defineQuery } from "next-sanity";

const localizedFields = `{
  en,
  hy,
  ru
}`;

const imageProjection = `{
  asset->{
    _id,
    url
  },
  hotspot,
  crop
}`;

const narrativeProjection = `{
  title ${localizedFields},
  body[] ${localizedFields}
}`;

const topicProjection = `{
  title ${localizedFields},
  description ${localizedFields}
}`;

export const programsQuery = defineQuery(`*[
  _type == "program" &&
  !(_id in path("drafts.**"))
] | order(_createdAt asc) {
  _id,
  "slug": slug.current,
  title ${localizedFields},
  shortTitle ${localizedFields},
  category ${localizedFields},
  description ${localizedFields},
  overview ${localizedFields},
  relationshipNote ${localizedFields},
  ctaLabel,
  externalUrlKey,
  hasOnSiteProfile,
  objectives[] ${localizedFields},
  activities[] ${localizedFields},
  impact[] ${localizedFields},
  image ${imageProjection},
  profile {
    tagline ${localizedFields},
    seoDescription ${localizedFields},
    facts[] {
      label ${localizedFields},
      value ${localizedFields}
    },
    about ${narrativeProjection},
    mission {
      title ${localizedFields},
      body[] ${localizedFields},
      points[] ${localizedFields}
    },
    education {
      title ${localizedFields},
      body[] ${localizedFields},
      formats[] ${topicProjection}
    },
    audience {
      title ${localizedFields},
      body[] ${localizedFields},
      groups[] ${topicProjection}
    },
    focusAreas {
      title ${localizedFields},
      body[] ${localizedFields},
      areas[] ${topicProjection}
    },
    highlights {
      title ${localizedFields},
      body[] ${localizedFields},
      milestones[] {
        date ${localizedFields},
        title ${localizedFields},
        description ${localizedFields}
      }
    },
    cta {
      eyebrow ${localizedFields},
      title ${localizedFields},
      body ${localizedFields},
      label ${localizedFields},
      url
    },
    sourceNote ${localizedFields}
  }
}`);
