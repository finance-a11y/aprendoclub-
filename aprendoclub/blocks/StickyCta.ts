import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'

/**
 * Espeja Home.stickyCta.
 */
export const stickyCtaFields: Field[] = [linkGroup('boton', 'Botón')]

export const StickyCtaBlock: Block = {
  slug: 'stickyCta',
  interfaceName: 'StickyCtaBlock',
  labels: {
    singular: 'CTA Sticky (mobile)',
    plural: 'CTA Sticky (mobile)',
  },
  fields: stickyCtaFields,
}
