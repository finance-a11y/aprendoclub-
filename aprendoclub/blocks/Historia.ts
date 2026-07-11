import type { Block, Field } from 'payload'

/**
 * Espeja QuienesSomos.historia.
 */
export const historiaFields: Field[] = [
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
]

export const HistoriaBlock: Block = {
  slug: 'historia',
  interfaceName: 'HistoriaBlock',
  labels: {
    singular: 'Historia',
    plural: 'Historia',
  },
  imageURL: '/block-previews/prose-block.svg',
  imageAltText: 'Bloque de texto largo tipo párrafo',
  fields: historiaFields,
}
