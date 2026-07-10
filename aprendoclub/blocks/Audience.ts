import type { Block, Field } from 'payload'

/**
 * Espeja Diplomado.audience.
 */
export const audienceFields: Field[] = [
  {
    name: 'titulo',
    type: 'text',
    required: true,
  },
  {
    name: 'subtitulo',
    type: 'text',
  },
  {
    name: 'tituloPerfiles',
    type: 'text',
  },
  {
    name: 'perfiles',
    type: 'array',
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'tituloDudas',
    type: 'text',
  },
  {
    name: 'dudas',
    type: 'array',
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'notaFinal',
    type: 'textarea',
  },
]

export const AudienceBlock: Block = {
  slug: 'audience',
  interfaceName: 'AudienceBlock',
  labels: {
    singular: 'Audiencia',
    plural: 'Audiencia',
  },
  imageURL: '/block-previews/prose-block.svg',
  imageAltText: 'Bloque de texto largo tipo párrafo',
  fields: audienceFields,
}
