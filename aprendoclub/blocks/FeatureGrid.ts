import type { Block, Field } from 'payload'

import { sectionHeaderFields } from '../fields/sectionHeader'

/**
 * Reusable feature grid: section header + array of icon/titulo/descripcion items.
 * Reused by problema/beneficios (home), origin/methodology/how-it-works/benefits (diplomado).
 */
export const featureGridFields: Field[] = [
  ...sectionHeaderFields,
  {
    name: 'items',
    type: 'array',
    fields: [
      {
        name: 'icon',
        type: 'text',
        admin: {
          description: 'Icono lucide seleccionado visualmente',
          components: {
            Field: '/components/admin/IconPicker#IconPicker',
          },
        },
      },
      {
        name: 'titulo',
        type: 'text',
        required: true,
      },
      {
        name: 'descripcion',
        type: 'textarea',
      },
    ],
  },
]

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  imageURL: '/block-previews/grid-cards.svg',
  imageAltText: 'Grid de tarjetas con ícono y dos líneas de texto cada una',
  fields: featureGridFields,
}
