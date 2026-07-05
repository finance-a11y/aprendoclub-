import type { Field } from 'payload'

/**
 * Reusable CTA/link fields: label + href.
 * Used by any block needing a button/link (Hero, Pricing, CtaBanner, ProgramGridRef).
 */
export const linkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'href',
    type: 'text',
    required: true,
  },
]

/**
 * Wraps linkFields in a named group field, so multiple links can coexist
 * on the same parent (e.g. ctaPrimario + ctaSecundario).
 */
export function linkGroup(name: string, label?: string): Field {
  return {
    name,
    type: 'group',
    label,
    fields: linkFields,
  }
}
