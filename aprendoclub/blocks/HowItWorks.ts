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
  fields: howItWorksFields,
}
