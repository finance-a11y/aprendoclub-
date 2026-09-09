import type { Block, Field } from 'payload'

/**
 * Reusable stats strip: header opcional (eyebrow/titulo/subtitulo, todos
 * opcionales para no romper instancias existentes sin header) + array de
 * value/titulo/label.
 */
export const statsFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'headerTitulo',
    type: 'text',
    admin: {
      description: 'Título de la sección (opcional, deja vacío si el bloque no lleva encabezado)',
    },
  },
  {
    name: 'subtitulo',
    type: 'textarea',
  },
  {
    name: 'items',
    type: 'array',
    fields: [
      {
        name: 'value',
        type: 'text',
        required: true,
      },
      {
        name: 'titulo',
        type: 'text',
        admin: {
          description: 'Línea corta en negrita debajo del número (opcional)',
        },
      },
      {
        name: 'label',
        type: 'text',
        required: true,
      },
    ],
  },
]

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
  imageURL: '/block-previews/stats-row.svg',
  imageAltText: 'Fila de números grandes con etiqueta debajo de cada uno',
  fields: statsFields,
}
