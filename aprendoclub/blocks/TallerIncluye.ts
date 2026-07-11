import type { Block, Field } from 'payload'

/**
 * Espeja Taller.incluye.
 */
export const tallerIncluyeFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'texto',
        type: 'text',
        required: true,
      },
      {
        name: 'valor',
        type: 'text',
      },
    ],
  },
]

export const TallerIncluyeBlock: Block = {
  slug: 'tallerIncluye',
  interfaceName: 'TallerIncluyeBlock',
  labels: {
    singular: 'Incluye (Taller)',
    plural: 'Incluye (Taller)',
  },
  imageURL: '/block-previews/grid-cards.svg',
  imageAltText: 'Grid de tarjetas con ícono y dos líneas de texto cada una',
  fields: tallerIncluyeFields,
}
