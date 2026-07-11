import type { Block, Field } from 'payload'

import { teamGridRefFields } from './TeamGridRef'

/**
 * Espeja Diplomado.team: teamIntro + equipo (referencia) + mentorSection.
 */
export const diplomadoTeamFields: Field[] = [
  {
    name: 'teamIntro',
    type: 'group',
    fields: [
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
    ],
  },
  {
    name: 'equipo',
    type: 'group',
    label: 'Equipo (referencia a team-members)',
    fields: teamGridRefFields,
  },
  {
    name: 'mentorSection',
    type: 'group',
    label: 'Sección mentora',
    fields: [
      {
        name: 'titulo',
        type: 'text',
        required: true,
      },
      {
        name: 'nombre',
        type: 'text',
        required: true,
      },
      {
        name: 'web',
        type: 'text',
      },
      {
        name: 'bio',
        type: 'array',
        required: true,
        fields: [
          {
            name: 'texto',
            type: 'textarea',
            required: true,
          },
        ],
      },
      {
        name: 'quote',
        type: 'text',
      },
    ],
  },
]

export const DiplomadoTeamBlock: Block = {
  slug: 'diplomadoTeam',
  interfaceName: 'DiplomadoTeamBlock',
  labels: {
    singular: 'Equipo (Diplomado)',
    plural: 'Equipo (Diplomado)',
  },
  imageURL: '/block-previews/team-grid.svg',
  imageAltText: 'Grid de avatares circulares con nombre debajo',
  fields: diplomadoTeamFields,
}
