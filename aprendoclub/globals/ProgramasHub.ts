import type { GlobalConfig } from 'payload'

import { linkGroup, sectionHeaderFields } from '../blocks'

/**
 * Global de la página /programas (hub).
 * Fuente: content/programas.ts (hubHero, hubCtaFinal) + orden hoy fijo por id.
 * NO cutover — la página sigue leyendo content/programas.ts.
 */
export const ProgramasHub: GlobalConfig = {
  slug: 'programas-hub',
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
      name: 'ctaFinal',
      type: 'group',
      fields: [
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
        linkGroup('boton', 'Botón'),
      ],
    },
    {
      name: 'programas',
      type: 'relationship',
      relationTo: 'programas',
      hasMany: true,
      required: true,
      label: 'Orden de programas en el hub',
    },
    {
      name: 'relatedLinks',
      type: 'group',
      label: 'Enlaces relacionados ("Antes de decidir")',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default ProgramasHub
