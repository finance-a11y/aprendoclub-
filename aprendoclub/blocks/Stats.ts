import type { Block, Field } from 'payload'

/**
 * Reusable stats strip: array of value/label items.
 */
export const statsFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    fields: [
      {
        name: 'value',
        type: 'text',
        required: true,
      },
      {
        name: 'label',
        type: 'text',
        required: true,
      },
    ],
  },
]

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
  fields: statsFields,
}
