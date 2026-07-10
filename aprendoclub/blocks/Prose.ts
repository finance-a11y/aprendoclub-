import type { Block, Field } from 'payload'

/**
 * Reusable Lexical prose block: multi-paragraph copy with emphasis
 * (historia, bios largas). Rendered future with .measure-prose class.
 */
export const proseFields: Field[] = [
  {
    name: 'contenido',
    type: 'richText',
  },
]

export const ProseBlock: Block = {
  slug: 'prose',
  interfaceName: 'ProseBlock',
  labels: {
    singular: 'Prose',
    plural: 'Prose',
  },
  imageURL: '/block-previews/prose-block.svg',
  imageAltText: 'Bloque de texto largo tipo párrafo',
  fields: proseFields,
}
