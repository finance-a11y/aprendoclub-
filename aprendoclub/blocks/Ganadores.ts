import type { Block, Field } from 'payload'

/**
 * Fusiona Reto.ganadoresIntro (textarea) + Reto.ganadores (array) en un solo
 * bloque.
 */
export const ganadoresFields: Field[] = [
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
]

export const GanadoresBlock: Block = {
  slug: 'ganadores',
  interfaceName: 'GanadoresBlock',
  labels: {
    singular: 'Ganadores',
    plural: 'Ganadores',
  },
  fields: ganadoresFields,
}
