import type { Block, Field } from 'payload'

/**
 * Reference block: pulls team members from the `team-members` collection
 * (Plan 01). Reused by quienes-somos and diplomado (filtered by
 * mostrarEnQuienesSomos/mostrarEnDiplomado at fetch time).
 */
export const teamGridRefFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'titulo',
    type: 'text',
  },
  {
    name: 'subtitulo',
    type: 'textarea',
  },
  {
    name: 'items',
    type: 'relationship',
    relationTo: 'team-members',
    hasMany: true,
  },
]

export const TeamGridRefBlock: Block = {
  slug: 'teamGridRef',
  interfaceName: 'TeamGridRefBlock',
  labels: {
    singular: 'Equipo (referencia)',
    plural: 'Equipo (referencia)',
  },
  fields: teamGridRefFields,
}
