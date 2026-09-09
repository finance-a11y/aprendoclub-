import type { Block, Field } from 'payload'

/**
 * Tabla comparativa "nosotros vs. otras opciones": columnas fijas
 * (nombre / lo que ofrecen / lo que no tienen), filas configurables.
 */
export const comparativaTablaFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
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
    name: 'colOfrecenLabel',
    type: 'text',
    defaultValue: 'Lo que ofrecen',
  },
  {
    name: 'colFaltaLabel',
    type: 'text',
    defaultValue: 'Lo que no tienen',
  },
  {
    name: 'filas',
    type: 'array',
    fields: [
      { name: 'nombre', type: 'text', required: true },
      { name: 'ofrecen', type: 'text', required: true },
      { name: 'falta', type: 'text', required: true },
    ],
  },
]

export const ComparativaTablaBlock: Block = {
  slug: 'comparativaTabla',
  interfaceName: 'ComparativaTablaBlock',
  labels: {
    singular: 'Comparativa (tabla)',
    plural: 'Comparativas (tabla)',
  },
  imageURL: '/block-previews/grid-cards.svg',
  imageAltText: 'Tabla comparando aprendoclub contra otras opciones del mercado',
  fields: comparativaTablaFields,
}
