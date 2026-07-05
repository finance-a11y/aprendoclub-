import type { Block, Field } from 'payload'

/**
 * Espeja Reto.agenda (array de nivel superior), envuelto en `items`.
 */
export const agendaFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    fields: [
      {
        name: 'dia',
        type: 'text',
        required: true,
      },
      {
        name: 'titulo',
        type: 'text',
        required: true,
      },
      {
        name: 'descripcion',
        type: 'textarea',
        required: true,
      },
      {
        name: 'imagen',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
]

export const AgendaBlock: Block = {
  slug: 'agenda',
  interfaceName: 'AgendaBlock',
  labels: {
    singular: 'Agenda',
    plural: 'Agenda',
  },
  fields: agendaFields,
}
