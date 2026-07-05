import type { Block, Field } from 'payload'

/**
 * Espeja Reto.razonNoEscalas.
 */
export const razonNoEscalasFields: Field[] = [
  {
    name: 'titulo',
    type: 'text',
    required: true,
  },
  {
    name: 'parrafo',
    type: 'textarea',
    required: true,
  },
  {
    name: 'frases',
    type: 'array',
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
    ],
  },
]

export const RazonNoEscalasBlock: Block = {
  slug: 'razonNoEscalas',
  interfaceName: 'RazonNoEscalasBlock',
  labels: {
    singular: 'Razón no escalas',
    plural: 'Razón no escalas',
  },
  fields: razonNoEscalasFields,
}
