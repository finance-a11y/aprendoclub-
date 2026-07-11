import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'

/**
 * Fusiona Taller.precio (monto + opciones) + Taller.cta (linkGroup) en un
 * único bloque de pricing del taller.
 */
export const tallerPricingFields: Field[] = [
  {
    name: 'monto',
    type: 'text',
    required: true,
  },
  {
    name: 'opciones',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'texto',
        type: 'text',
        required: true,
      },
    ],
  },
  linkGroup('cta', 'CTA'),
]

export const TallerPricingBlock: Block = {
  slug: 'tallerPricing',
  interfaceName: 'TallerPricingBlock',
  labels: {
    singular: 'Pricing (Taller)',
    plural: 'Pricing (Taller)',
  },
  imageURL: '/block-previews/pricing-columns.svg',
  imageAltText: 'Columnas de precios con lista de beneficios y botón de acción',
  fields: tallerPricingFields,
}
