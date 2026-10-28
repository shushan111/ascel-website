'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin_panel/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {StudioLogo} from './src/sanity/components/StudioLogo'
import {donationActions} from './src/sanity/actions/donationActions'

export default defineConfig({
  basePath: '/admin_panel',
  name: 'ascel-studio',
  title: 'ASCEL — Կայքի կառավարում',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    // Donations are created by the website only, never from the Studio.
    templates: (prev) => prev.filter((template) => template.schemaType !== 'donation'),
  },
  document: {
    // A donation has no publish, delete or duplicate: only the bank actions.
    actions: (prev, context) => (context.schemaType === 'donation' ? donationActions : prev),
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'donation'),
  },
  plugins: [
    structureTool({title: 'Բովանդակություն', structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({title: 'Հարցումներ (GROQ)', defaultApiVersion: apiVersion}),
  ],
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
})
