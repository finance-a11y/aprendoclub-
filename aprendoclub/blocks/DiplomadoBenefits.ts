import type { Block, Field } from 'payload'

/**
 * Espeja Diplomado.benefits.
 */
export const diplomadoBenefitsFields: Field[] = [
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
]

export const DiplomadoBenefitsBlock: Block = {
  slug: 'diplomadoBenefits',
  interfaceName: 'DiplomadoBenefitsBlock',
  labels: {
    singular: 'Beneficios (Diplomado)',
    plural: 'Beneficios (Diplomado)',
  },
  fields: diplomadoBenefitsFields,
}
