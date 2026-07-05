import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'rol', 'mostrarEnQuienesSomos', 'mostrarEnDiplomado', 'orden'],
  },
  defaultSort: 'orden',
  fields: [
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
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'iniciales',
      type: 'text',
      required: true,
    },
    {
      name: 'web',
      type: 'text',
    },
    {
      name: 'mostrarEnQuienesSomos',
      type: 'checkbox',
    },
    {
      name: 'mostrarEnDiplomado',
      type: 'checkbox',
    },
    {
      name: 'orden',
      type: 'number',
    },
  ],
}

export default TeamMembers
