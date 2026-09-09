import type { Block, Field } from 'payload'

/**
 * Sección "antes y después": título + dos columnas de bullets (antes/después).
 */
export const antesDespuesFields: Field[] = [
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
    name: 'antesLabel',
    type: 'text',
    defaultValue: 'Antes de entrar',
  },
  {
    name: 'antes',
    type: 'array',
    fields: [{ name: 'texto', type: 'text', required: true }],
  },
  {
    name: 'despuesLabel',
    type: 'text',
    defaultValue: 'Al completar el programa',
  },
  {
    name: 'despues',
    type: 'array',
    fields: [{ name: 'texto', type: 'text', required: true }],
  },
]

export const AntesDespuesBlock: Block = {
  slug: 'antesDespues',
  interfaceName: 'AntesDespuesBlock',
  labels: {
    singular: 'Antes y Después',
    plural: 'Antes y Después',
  },
  imageURL: '/block-previews/grid-cards.svg',
  imageAltText: 'Dos columnas comparando el antes y el después del programa',
  fields: antesDespuesFields,
}
