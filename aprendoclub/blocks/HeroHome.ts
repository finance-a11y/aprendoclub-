import type { Block, Field } from 'payload'

import { heroFields } from './Hero'

/**
 * Espeja el grupo `hero` de globals/Home.ts: heroFields + avatares/ratingTexto/
 * videoBackground propios del hero del home.
 */
export const heroHomeFields: Field[] = [
  ...heroFields,
  {
    name: 'avatares',
    type: 'relationship',
    relationTo: 'media',
    hasMany: true,
    label: 'Avatares de estudiantes',
  },
  {
    name: 'ratingTexto',
    type: 'text',
  },
  {
    name: 'videoBackground',
    type: 'upload',
    relationTo: 'media',
    label: 'Video de fondo',
  },
]

export const HeroHomeBlock: Block = {
  slug: 'heroHome',
  interfaceName: 'HeroHomeBlock',
  labels: {
    singular: 'Hero Home',
    plural: 'Heroes Home',
  },
  imageURL: '/block-previews/hero-split.svg',
  imageAltText: 'Hero con insignia, título en dos líneas, subtítulo y dos botones',
  fields: heroHomeFields,
}
