import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'

/**
 * Reusable Hero fields. Covers home/diplomado/reto/pages hero variants
 * (research §3, §10, §12): badge, eyebrow, split title (pre/accent/post),
 * subtitle, body text, bullets, image, primary/secondary CTA, microcopy.
 */
export const heroFields: Field[] = [
  {
    name: 'badgeText',
    type: 'text',
  },
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'tituloPre',
    type: 'text',
  },
  {
    name: 'tituloAccent',
    type: 'text',
  },
  {
    name: 'tituloPost',
    type: 'text',
  },
  {
    name: 'subtitulo',
    type: 'textarea',
  },
  {
    name: 'texto',
    type: 'textarea',
  },
  {
    name: 'bullets',
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
    name: 'imagen',
    type: 'upload',
    relationTo: 'media',
  },
  linkGroup('ctaPrimario', 'CTA Primario'),
  linkGroup('ctaSecundario', 'CTA Secundario'),
  {
    name: 'microcopy',
    type: 'text',
  },
]

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: heroFields,
}
