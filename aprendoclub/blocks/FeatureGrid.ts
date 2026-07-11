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
        name: 'iconMode',
        type: 'select',
        defaultValue: 'icon',
        options: [
          { label: 'Ícono (lucide)', value: 'icon' },
          { label: 'Imagen / ilustración', value: 'image' },
        ],
        label: 'Tipo de ícono',
        admin: {
          description: 'Tipo de ícono',
        },
      },
      {
        name: 'icon',
        type: 'text',
        label: 'Ícono',
        admin: {
          description: 'Icono lucide seleccionado visualmente',
          components: {
            Field: '/components/admin/IconPicker#IconPicker',
          },
          condition: (_, siblingData) => siblingData?.iconMode !== 'image',
        },
      },
      {
        name: 'iconColor',
        type: 'select',
        defaultValue: 'auto',
        options: [
          { label: 'Automático (recomendado)', value: 'auto' },
          { label: 'Accent (verde lima)', value: 'accent' },
          { label: 'Blanco', value: 'white' },
          { label: 'Azul (primary)', value: 'primary' },
        ],
        label: 'Color del ícono',
        admin: {
          description: 'Si no elegís uno, se usa el color de mayor contraste del sistema',
          condition: (_, siblingData) => siblingData?.iconMode !== 'image',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Imagen/ilustración',
        admin: {
          description: 'Sube una imagen chica o ilustración en vez de un ícono lucide',
          condition: (_, siblingData) => siblingData?.iconMode === 'image',
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
