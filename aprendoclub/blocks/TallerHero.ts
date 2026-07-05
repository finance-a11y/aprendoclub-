import type { Block, Field } from 'payload'

/**
 * Espeja Taller.hero.
 */
export const tallerHeroFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
    required: true,
  },
  {
    name: 'titulo',
    type: 'text',
    required: true,
  },
  {
    name: 'subtitulo',
    type: 'textarea',
    required: true,
  },
  {
    name: 'duracion',
    type: 'text',
    required: true,
  },
]

export const TallerHeroBlock: Block = {
  slug: 'tallerHero',
  interfaceName: 'TallerHeroBlock',
  labels: {
    singular: 'Hero Taller',
    plural: 'Heroes Taller',
  },
  fields: tallerHeroFields,
}
