import type { Field } from 'payload'

/**
 * Reusable section header fields: eyebrow + titulo + subtitulo.
 * Used by Pricing, FeatureGrid, ProgramGridRef and other section blocks.
 */
export const sectionHeaderFields: Field[] = [
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
]
