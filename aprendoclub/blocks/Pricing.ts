import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'
import { sectionHeaderFields } from '../fields/sectionHeader'

/**
 * Reusable Pricing fields. Flexible for 1-2 plans (home has 2,
 * taller/reto/diplomado have 1) plus an optional "ctaAsesoria" upsell.
 */
export const pricingFields: Field[] = [
  ...sectionHeaderFields,
  {
    name: 'planes',
    type: 'array',
    fields: [
      {
        name: 'nombre',
        type: 'text',
        required: true,
      },
      {
        name: 'badge',
        type: 'text',
      },
      {
        name: 'precio',
        type: 'text',
        required: true,
      },
      {
        name: 'precioTachado',
        type: 'text',
      },
      {
        name: 'precioNota',
        type: 'text',
      },
      {
        name: 'cuotasTexto',
        type: 'text',
      },
      {
        name: 'features',
        type: 'array',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
          },
        ],
      },
      linkGroup('cta', 'CTA'),
    ],
  },
  {
    name: 'ctaAsesoria',
    type: 'group',
    label: 'CTA Asesoría',
    fields: [
      {
        name: 'titulo',
        type: 'text',
      },
      {
        name: 'texto',
        type: 'textarea',
      },
      linkGroup('cta', 'CTA'),
    ],
  },
]

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing',
  },
  fields: pricingFields,
}
