import type { Block, Field } from 'payload'

import { featureGridFields } from './FeatureGrid'

/**
 * Espeja Diplomado.howItWorks: featureGridFields + ctaLabel/ctaHref.
 */
export const howItWorksFields: Field[] = [
  ...featureGridFields,
  {
    name: 'ctaLabel',
    type: 'text',
  },
  {
    name: 'ctaHref',
    type: 'text',
  },
]

export const HowItWorksBlock: Block = {
  slug: 'howItWorks',
  interfaceName: 'HowItWorksBlock',
  labels: {
    singular: 'Cómo funciona',
    plural: 'Cómo funciona',
  },
  imageURL: '/block-previews/grid-cards.svg',
  imageAltText: 'Grid de tarjetas con ícono y dos líneas de texto cada una',
  fields: howItWorksFields,
}
