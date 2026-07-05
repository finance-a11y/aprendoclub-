import type { Block, Field } from 'payload'

/**
 * Espeja Reto.comparacion, envuelto en `items`.
 */
export const comparacionFields: Field[] = [
  {
    name: 'items',
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
]

export const ComparacionBlock: Block = {
  slug: 'comparacion',
  interfaceName: 'ComparacionBlock',
  labels: {
    singular: 'Comparación',
    plural: 'Comparación',
  },
  fields: comparacionFields,
}
