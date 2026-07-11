import type { Block, Field } from 'payload'

/**
 * Espeja QuienesSomos.metodologia.
 */
export const metodologiaFields: Field[] = [
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
    name: 'pilares',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'nombre',
        type: 'text',
        required: true,
      },
      {
        name: 'descripcion',
        type: 'textarea',
        required: true,
      },
    ],
  },
]

export const MetodologiaBlock: Block = {
  slug: 'metodologia',
  interfaceName: 'MetodologiaBlock',
  labels: {
    singular: 'Metodología',
    plural: 'Metodología',
  },
  imageURL: '/block-previews/prose-block.svg',
  imageAltText: 'Bloque de texto largo tipo párrafo',
  fields: metodologiaFields,
}
