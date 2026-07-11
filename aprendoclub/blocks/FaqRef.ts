import type { Block, Field } from 'payload'

/**
 * Reference block: pulls FAQ entries from the `faq` collection (Plan 01).
 * The `page` filter is applied at fetch time (Phase 15); here we just
 * expose the relationship for editorial selection.
 * Reused by home/diplomado/reto/taller.
 */
export const faqRefFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'titulo',
    type: 'text',
  },
  {
    name: 'items',
    type: 'relationship',
    relationTo: 'faq',
    hasMany: true,
  },
]

export const FaqRefBlock: Block = {
  slug: 'faqRef',
  interfaceName: 'FaqRefBlock',
  labels: {
    singular: 'FAQ (referencia)',
    plural: 'FAQ (referencia)',
  },
  imageURL: '/block-previews/faq-accordion.svg',
  imageAltText: 'Lista de preguntas frecuentes con flecha desplegable',
  fields: faqRefFields,
}
