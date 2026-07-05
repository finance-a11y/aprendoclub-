import type { Block, Field } from 'payload'

/**
 * Espeja Reto.mentora.
 */
export const mentoraFields: Field[] = [
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
]

export const MentoraBlock: Block = {
  slug: 'mentora',
  interfaceName: 'MentoraBlock',
  labels: {
    singular: 'Mentora',
    plural: 'Mentora',
  },
  fields: mentoraFields,
}
