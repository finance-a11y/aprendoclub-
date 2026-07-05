import type { Block, Field } from 'payload'

/**
 * Espeja Diplomado.pricing.
 */
export const diplomadoPricingFields: Field[] = [
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
    name: 'planNombre',
    type: 'text',
    required: true,
  },
  {
    name: 'badgeText',
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
    name: 'descripcion',
    type: 'textarea',
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
  {
    name: 'ctaLabel',
    type: 'text',
  },
  {
    name: 'ctaHref',
    type: 'text',
  },
  {
    name: 'garantiaTexto',
    type: 'textarea',
  },
]

export const DiplomadoPricingBlock: Block = {
  slug: 'diplomadoPricing',
  interfaceName: 'DiplomadoPricingBlock',
  labels: {
    singular: 'Pricing (Diplomado)',
    plural: 'Pricing (Diplomado)',
  },
  fields: diplomadoPricingFields,
}
