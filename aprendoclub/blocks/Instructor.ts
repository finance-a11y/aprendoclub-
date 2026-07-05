import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'
import { statsFields } from './Stats'

/**
 * Espeja Home.instructor.
 */
export const instructorFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
    required: true,
  },
  {
    name: 'nombre',
    type: 'text',
    required: true,
  },
  {
    name: 'rol',
    type: 'text',
    required: true,
  },
  {
    name: 'bioCorta1',
    type: 'textarea',
    required: true,
  },
  {
    name: 'bioCorta2',
    type: 'textarea',
    required: true,
  },
  {
    name: 'stats',
    type: 'group',
    fields: statsFields,
  },
  {
    name: 'foto',
    type: 'upload',
    relationTo: 'media',
  },
  linkGroup('teaser', 'Teaser (link a /quienes-somos)'),
]

export const InstructorBlock: Block = {
  slug: 'instructor',
  interfaceName: 'InstructorBlock',
  labels: {
    singular: 'Instructor',
    plural: 'Instructor',
  },
  fields: instructorFields,
}
