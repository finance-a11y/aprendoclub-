import type { Block, Field } from 'payload'

/**
 * Reference block: pulls testimonios from the `testimonios` collection
 * (Plan 01). Home filters by `featuredOnHome` at fetch time; /testimonios
 * shows all.
 */
export const testimonialRefFields: Field[] = [
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
    relationTo: 'testimonios',
    hasMany: true,
  },
]

export const TestimonialRefBlock: Block = {
  slug: 'testimonialRef',
  interfaceName: 'TestimonialRefBlock',
  labels: {
    singular: 'Testimonios (referencia)',
    plural: 'Testimonios (referencia)',
  },
  fields: testimonialRefFields,
}
