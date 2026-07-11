import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'

/**
 * Widget de asesoría gratuita: eyebrow/título/subtítulo + bullets (checklist) + CTA configurable.
 * Reemplaza la sección de precios del home (ADV-01/ADV-02).
 */
export const asesoriaWidgetFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
    label: 'Eyebrow',
  },
  {
    name: 'titulo',
    type: 'text',
    required: true,
    label: 'Título',
  },
  {
    name: 'subtitulo',
    type: 'textarea',
    label: 'Subtítulo',
  },
  {
    name: 'bullets',
    type: 'array',
    label: 'Bullets',
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
    ],
  },
  linkGroup('boton', 'Botón'),
]

export const AsesoriaWidgetBlock: Block = {
  slug: 'asesoriaWidget',
  interfaceName: 'AsesoriaWidgetBlock',
  labels: {
    singular: 'Widget de asesoría',
    plural: 'Widgets de asesoría',
  },
  imageURL: '/block-previews/pricing-columns.svg',
  imageAltText: 'Tarjeta con checklist de beneficios y botón de llamado a la acción centrado',
  fields: asesoriaWidgetFields,
}
