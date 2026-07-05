import type { Block, Field } from 'payload'

/**
 * Espeja Diplomado.curriculum (timeline de 16 semanas).
 */
export const curriculum16SemanasFields: Field[] = [
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
]

export const Curriculum16SemanasBlock: Block = {
  slug: 'curriculum16Semanas',
  interfaceName: 'Curriculum16SemanasBlock',
  labels: {
    singular: 'Temario 16 semanas',
    plural: 'Temario 16 semanas',
  },
  fields: curriculum16SemanasFields,
}
