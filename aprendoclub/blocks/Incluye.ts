import type { Block, Field } from 'payload'

/**
 * Espeja Reto.incluye, envuelto en `items`.
 */
export const incluyeFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
    ],
  },
]

export const IncluyeBlock: Block = {
  slug: 'incluye',
  interfaceName: 'IncluyeBlock',
  labels: {
    singular: 'Incluye',
    plural: 'Incluye',
  },
  fields: incluyeFields,
}
