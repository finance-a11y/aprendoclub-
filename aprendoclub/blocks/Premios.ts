import type { Block, Field } from 'payload'

/**
 * Espeja Reto.premios.
 */
export const premiosFields: Field[] = [
  {
    name: 'mayor',
    type: 'group',
    fields: [
      {
        name: 'titulo',
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
  {
    name: 'becas',
    type: 'group',
    fields: [
      {
        name: 'titulo',
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
  {
    name: 'comoSeGana',
    type: 'textarea',
    required: true,
  },
]

export const PremiosBlock: Block = {
  slug: 'premios',
  interfaceName: 'PremiosBlock',
  labels: {
    singular: 'Premios',
    plural: 'Premios',
  },
  imageURL: '/block-previews/section-header.svg',
  imageAltText: 'Encabezado de sección con eyebrow y título',
  fields: premiosFields,
}
