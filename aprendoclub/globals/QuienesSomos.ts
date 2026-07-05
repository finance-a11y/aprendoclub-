import type { GlobalConfig } from 'payload'

import { ctaBannerFields, sectionHeaderFields, statsFields, teamGridRefFields } from '../blocks'

/**
 * Global de la página /quienes-somos.
 * Fuente: content/quienes-somos.ts. El equipo se centraliza en la colección
 * `team-members` (relationship) en vez de un array embebido, para compartirlo
 * con el diplomado (filtro mostrarEnQuienesSomos se aplica en el fetch de Phase 15).
 * NO cutover — la página sigue leyendo content/quienes-somos.ts.
 */
export const QuienesSomos: GlobalConfig = {
  slug: 'quienes-somos',
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
      name: 'historia',
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
          name: 'parrafos',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'texto',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'quote',
          type: 'group',
          fields: [
            {
              name: 'texto',
              type: 'textarea',
              required: true,
            },
            {
              name: 'autor',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'fundadora',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
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
          name: 'bio',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'texto',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'equipo',
      type: 'group',
      label: 'Equipo (referencia a team-members)',
      fields: teamGridRefFields,
    },
    {
      name: 'metodologia',
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
          name: 'pilares',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'nombre',
              type: 'text',
              required: true,
            },
            {
              name: 'descripcion',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      fields: statsFields,
    },
    {
      name: 'ctaFinal',
      type: 'group',
      fields: ctaBannerFields,
    },
  ],
}

export default QuienesSomos
