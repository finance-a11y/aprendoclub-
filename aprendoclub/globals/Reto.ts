import type { GlobalConfig } from 'payload'

import { linkFields } from '../fields/link'

/**
 * Global de la página /reto (Reto 7 días).
 * Fuente: content/reto.ts (16 exports, mapeo 1:1). Página grande (12 secciones),
 * aislada en su propio plan por volumen (research §10).
 *
 * faq es relationship a la colección `faq` (filtro page=reto en el fetch del
 * cutover, Phase 15+), reemplaza el array embebido FaqItem[] de content/reto.ts.
 * agenda y ganadores quedan como arrays embebidos (v1.3, research §10/§18).
 *
 * NO cutover — /app/(frontend)/reto sigue leyendo content/reto.ts.
 */
export const Reto: GlobalConfig = {
  slug: 'reto',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'urgencia',
      type: 'text',
      required: true,
    },
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
          name: 'destacado',
          type: 'text',
          required: true,
        },
        {
          name: 'texto',
          type: 'textarea',
          required: true,
        },
        {
          name: 'bullets',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'precioTexto',
          type: 'text',
          required: true,
        },
        {
          name: 'ctas',
          type: 'array',
          fields: linkFields,
        },
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'razonNoEscalas',
      type: 'group',
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'parrafo',
          type: 'textarea',
          required: true,
        },
        {
          name: 'frases',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'mentora',
      type: 'group',
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
        },
        {
          name: 'rol',
          type: 'text',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            {
              name: 'valor',
              type: 'text',
              required: true,
            },
            {
              name: 'etiqueta',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'historia',
          type: 'textarea',
          required: true,
        },
        {
          name: 'quote',
          type: 'text',
          required: true,
        },
        {
          name: 'cierre',
          type: 'textarea',
          required: true,
        },
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'agenda',
      type: 'array',
      fields: [
        {
          name: 'dia',
          type: 'text',
          required: true,
        },
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'descripcion',
          type: 'textarea',
          required: true,
        },
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'comparacion',
      type: 'array',
      fields: [
        {
          name: 'deSiempre',
          type: 'text',
          required: true,
        },
        {
          name: 'elReto',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'incluye',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'premios',
      type: 'group',
      fields: [
        {
          name: 'mayor',
          type: 'group',
          fields: [
            {
              name: 'titulo',
              type: 'text',
              required: true,
            },
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'becas',
          type: 'group',
          fields: [
            {
              name: 'titulo',
              type: 'text',
              required: true,
            },
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'comoSeGana',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'precio',
          type: 'text',
          required: true,
        },
        {
          name: 'precioNota',
          type: 'text',
          required: true,
        },
        {
          name: 'incluyeTexto',
          type: 'text',
          required: true,
        },
        {
          name: 'ctas',
          type: 'array',
          fields: linkFields,
        },
        {
          name: 'nota',
          type: 'text',
          required: true,
        },
        {
          name: 'whatsapp',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ganadoresIntro',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ganadores',
      type: 'array',
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
        },
        {
          name: 'edicion',
          type: 'text',
          required: true,
        },
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'faq',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
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
          name: 'botonLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'botonHref',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Reto
