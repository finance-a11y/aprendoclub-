import type { Block, Field } from 'payload'

/**
 * Espeja Reto.urgencia (un `text` de nivel superior), envuelto como bloque.
 */
export const barraUrgenciaFields: Field[] = [
  {
    name: 'texto',
    type: 'text',
    required: true,
  },
]

export const BarraUrgenciaBlock: Block = {
  slug: 'barraUrgencia',
  interfaceName: 'BarraUrgenciaBlock',
  labels: {
    singular: 'Barra de urgencia',
    plural: 'Barra de urgencia',
  },
  imageURL: '/block-previews/banner-urgencia.svg',
  imageAltText: 'Barra delgada de urgencia con texto centrado',
  fields: barraUrgenciaFields,
}
