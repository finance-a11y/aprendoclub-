import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { allBlocks } from '../blocks'
import { pageRedirectHook } from '../lib/redirects'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    // Lectura pública: el render catch-all (Plan R03+) resuelve páginas sin auth.
    read: () => true,
  },
  hooks: {
    afterChange: [
      pageRedirectHook,
      ({ doc, req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath(`/${doc.slug === 'home' ? '' : doc.slug}`)
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath(`/${doc.slug === 'home' ? '' : doc.slug}`)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description:
          "Ruta de la página sin barra inicial. La home usa 'home' (la raíz se cablea en el cutover, Phase 17). Ej: 'nueva-landing', 'promos/verano'.",
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== 'string') return value
            return value.trim().toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '')
          },
        ],
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      minRows: 0,
      label: 'Contenido (bloques)',
      blocks: allBlocks,
      admin: {
        description: 'Agrega, reordena y quita bloques para construir la página.',
      },
    },
  ],
}

export default Pages
