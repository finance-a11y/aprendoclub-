import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'
import { sectionHeaderFields } from '../fields/sectionHeader'

/**
 * Reference block: pulls programs from the `programas` collection
 * (Plan 01). Reused by home and programas-hub.
 */
export const programGridRefFields: Field[] = [
  ...sectionHeaderFields,
  linkGroup('boton', 'Botón'),
  {
    name: 'items',
    type: 'relationship',
    relationTo: 'programas',
    hasMany: true,
  },
]

export const ProgramGridRefBlock: Block = {
  slug: 'programGridRef',
  interfaceName: 'ProgramGridRefBlock',
  labels: {
    singular: 'Programas (referencia)',
    plural: 'Programas (referencia)',
  },
  fields: programGridRefFields,
}
