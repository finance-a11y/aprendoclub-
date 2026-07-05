import type { Block, Field } from 'payload'

import { linkFields } from '../fields/link'

/**
 * Espeja Reto.hero.
 */
export const retoHeroFields: Field[] = [
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
]

export const RetoHeroBlock: Block = {
  slug: 'retoHero',
  interfaceName: 'RetoHeroBlock',
  labels: {
    singular: 'Hero Reto',
    plural: 'Heroes Reto',
  },
  fields: retoHeroFields,
}
