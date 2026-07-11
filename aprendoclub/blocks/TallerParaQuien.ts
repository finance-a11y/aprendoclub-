import type { Block, Field } from 'payload'

/**
 * Espeja Taller.paraQuien.
 */
export const tallerParaQuienFields: Field[] = [
  {
    name: 'texto',
    type: 'textarea',
    required: true,
  },
]

export const TallerParaQuienBlock: Block = {
  slug: 'tallerParaQuien',
  interfaceName: 'TallerParaQuienBlock',
  labels: {
    singular: 'Para quién (Taller)',
    plural: 'Para quién (Taller)',
  },
  imageURL: '/block-previews/grid-cards.svg',
  imageAltText: 'Grid de tarjetas con ícono y dos líneas de texto cada una',
  fields: tallerParaQuienFields,
}
