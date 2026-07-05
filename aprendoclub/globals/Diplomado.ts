import type { GlobalConfig } from 'payload'

import {
  faqRefFields,
  featureGridFields,
  heroFields,
  linkFields,
  linkGroup,
  teamGridRefFields,
} from '../blocks'

/**
 * Global de la página /diplomado.
 * Fuente: content/diplomado.ts (extracción verbatim de components/diplomado/*,
 * research §12). El global más grande (10 secciones + relatedLinks + courseMeta),
 * dejado al final por volumen (SCH-01).
 *
 * equipo (grid) es relationship a `team-members` (filtro mostrarEnDiplomado en
 * el fetch de Phase 16, igual que quienes-somos). faq es relationship a `faq`
 * (filtro page=diplomado). courseMeta alimenta lib/schema.ts `course()` en
 * Phase 17.
 *
 * NO cutover — /app/(frontend)/(site)/diplomado sigue leyendo
 * components/diplomado/* con su copy inline.
 */
export const Diplomado: GlobalConfig = {
  slug: 'diplomado',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: heroFields,
    },
    {
      name: 'origin',
      type: 'group',
      label: 'Origen',
      fields: featureGridFields,
    },
    {
      name: 'audience',
      type: 'group',
      label: 'Audiencia',
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitulo',
          type: 'text',
        },
        {
          name: 'tituloPerfiles',
          type: 'text',
        },
        {
          name: 'perfiles',
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
          name: 'tituloDudas',
          type: 'text',
        },
        {
          name: 'dudas',
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
          name: 'notaFinal',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'methodology',
      type: 'group',
      label: 'Metodología',
      admin: {
        description:
          'Copy propia del diplomado (EPAM). No reusar el copy de quienes-somos.metodologia.',
      },
      fields: featureGridFields,
    },
    {
      name: 'curriculum',
      type: 'group',
      label: 'Temario',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'semanas',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'numero',
              type: 'number',
              required: true,
            },
            {
              name: 'titulo',
              type: 'text',
              required: true,
            },
            {
              name: 'detalle',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      label: 'Cómo funciona',
      fields: [
        ...featureGridFields,
        {
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaHref',
          type: 'text',
        },
      ],
    },
    {
      name: 'team',
      type: 'group',
      label: 'Equipo',
      fields: [
        {
          name: 'teamIntro',
          type: 'group',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
            },
            {
              name: 'titulo',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitulo',
              type: 'textarea',
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
          name: 'mentorSection',
          type: 'group',
          label: 'Sección mentora',
          fields: [
            {
              name: 'titulo',
              type: 'text',
              required: true,
            },
            {
              name: 'nombre',
              type: 'text',
              required: true,
            },
            {
              name: 'web',
              type: 'text',
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
              name: 'quote',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'group',
      label: 'Beneficios',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitulo',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'texto',
              type: 'textarea',
              required: true,
            },
            {
              name: 'valor',
              type: 'text',
            },
          ],
        },
        {
          name: 'extras',
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
      name: 'pricing',
      type: 'group',
      label: 'Precio',
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitulo',
          type: 'textarea',
        },
        {
          name: 'planNombre',
          type: 'text',
          required: true,
        },
        {
          name: 'badgeText',
          type: 'text',
        },
        {
          name: 'precio',
          type: 'text',
          required: true,
        },
        {
          name: 'precioTachado',
          type: 'text',
        },
        {
          name: 'precioNota',
          type: 'text',
        },
        {
          name: 'descripcion',
          type: 'textarea',
        },
        {
          name: 'features',
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
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaHref',
          type: 'text',
        },
        {
          name: 'garantiaTexto',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'FAQ (referencia a faq, page=diplomado)',
      fields: faqRefFields,
    },
    {
      name: 'ctaFinal',
      type: 'group',
      label: 'CTA final',
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'texto',
          type: 'textarea',
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
        linkGroup('boton', 'Botón'),
      ],
    },
    {
      name: 'relatedLinks',
      type: 'array',
      label: 'Links relacionados',
      fields: linkFields,
    },
    {
      name: 'courseMeta',
      type: 'group',
      label: 'Meta del curso (JSON-LD Course, Phase 17)',
      fields: [
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'courseWorkload',
          type: 'text',
          admin: {
            description: 'Duración ISO 8601, ej. "P16W" (16 semanas).',
          },
        },
        {
          name: 'startDate',
          type: 'text',
          admin: {
            description: 'YYYY-MM-DD. Vacío si el curso es rolling/on-demand.',
          },
        },
      ],
    },
  ],
}

export default Diplomado
