import type { GlobalConfig } from 'payload'

import { linkGroup } from '../blocks'

/**
 * Global de la página /programas/taller-seo-con-ia.
 * Fuente: content/taller-seo-con-ia.ts. Mapeo directo.
 * NO cutover — la página sigue leyendo content/taller-seo-con-ia.ts.
 */
export const Taller: GlobalConfig = {
  slug: 'taller-seo-con-ia',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
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
          name: 'subtitulo',
          type: 'textarea',
          required: true,
        },
        {
          name: 'duracion',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'incluye',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'texto',
          type: 'text',
          required: true,
        },
        {
          name: 'valor',
          type: 'text',
        },
      ],
    },
    {
      name: 'paraQuien',
      type: 'textarea',
      required: true,
    },
    {
      name: 'precio',
      type: 'group',
      fields: [
        {
          name: 'monto',
          type: 'text',
          required: true,
        },
        {
          name: 'opciones',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'texto',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    linkGroup('cta', 'CTA'),
  ],
}

export default Taller
