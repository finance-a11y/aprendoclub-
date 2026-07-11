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
    admin: {
      description:
        'Imagen del hero del Diplomado. Recomendado: 1600×900px (16:9), JPG/WEBP, máx. 300KB. Reemplaza el placeholder subiendo el archivo real aquí.',
    },
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
  imageURL: '/block-previews/hero-split.svg',
  imageAltText: 'Hero con insignia, título en dos líneas, subtítulo y dos botones',
  fields: heroFields,
}
