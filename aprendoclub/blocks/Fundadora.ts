import type { Block, Field } from 'payload'

/**
 * Espeja QuienesSomos.fundadora.
 */
export const fundadoraFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
    required: true,
  },
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
    name: 'bio',
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
    name: 'foto',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

export const FundadoraBlock: Block = {
  slug: 'fundadora',
  interfaceName: 'FundadoraBlock',
  labels: {
    singular: 'Fundadora',
    plural: 'Fundadora',
  },
  imageURL: '/block-previews/team-grid.svg',
  imageAltText: 'Grid de avatares circulares con nombre debajo',
  fields: fundadoraFields,
}
