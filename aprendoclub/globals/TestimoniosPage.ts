import type { GlobalConfig } from 'payload'

import { ctaBannerFields, logosRefFields, sectionHeaderFields } from '../blocks'

/**
 * Global de la página /testimonios.
 * Fuente: content/testimonios.ts. El grid de testimonios NO vive aquí — se
 * sirve desde la colección `testimonios` (Plan 01). Este global cubre hero,
 * títulos, banda de logos, galería del Reto y CTA final.
 * NO cutover — la página sigue leyendo content/testimonios.ts.
 */
export const TestimoniosPage: GlobalConfig = {
  slug: 'testimonios-page',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: sectionHeaderFields,
    },
    {
      name: 'gridTitulo',
      type: 'text',
      required: true,
    },
    {
      name: 'logos',
      type: 'group',
      label: 'Logos (banda "empresas como")',
      fields: logosRefFields,
    },
    {
      name: 'reto',
      type: 'group',
      label: 'Reto (cabecera de la galería)',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'texto',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'retoGaleria',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Galería del Reto (t1..t9)',
    },
    {
      name: 'cta',
      type: 'group',
      fields: ctaBannerFields,
    },
  ],
}

export default TestimoniosPage
