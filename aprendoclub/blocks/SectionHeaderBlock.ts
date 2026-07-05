import type { Block } from 'payload'

import { sectionHeaderFields } from '../fields/sectionHeader'

/**
 * Materializa sectionHeaderFields (helper de 14-02) como Block reutilizable.
 * Cubre los heroes de quienes-somos, testimonios-page y programas-hub, que en
 * sus globals fuente usaban directamente sectionHeaderFields sin campos extra.
 */
export const SectionHeaderBlock: Block = {
  slug: 'sectionHeader',
  interfaceName: 'SectionHeaderBlock',
  labels: {
    singular: 'Section Header',
    plural: 'Section Headers',
  },
  fields: sectionHeaderFields,
}
