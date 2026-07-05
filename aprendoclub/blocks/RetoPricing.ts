import type { Block, Field } from 'payload'

import { linkFields } from '../fields/link'

/**
 * Espeja Reto.pricing.
 */
export const retoPricingFields: Field[] = [
  {
    name: 'precio',
    type: 'text',
    required: true,
  },
  {
    name: 'precioNota',
    type: 'text',
    required: true,
  },
  {
    name: 'incluyeTexto',
    type: 'text',
    required: true,
  },
  {
    name: 'ctas',
    type: 'array',
    fields: linkFields,
  },
  {
    name: 'nota',
    type: 'text',
    required: true,
  },
  {
    name: 'whatsapp',
    type: 'text',
    required: true,
  },
]

export const RetoPricingBlock: Block = {
  slug: 'retoPricing',
  interfaceName: 'RetoPricingBlock',
  labels: {
    singular: 'Pricing (Reto)',
    plural: 'Pricing (Reto)',
  },
  fields: retoPricingFields,
}
