import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'

/**
 * Reusable CTA banner: titulo + texto + bullets + boton (required).
 */
export const ctaBannerFields: Field[] = [
  {
    name: 'titulo',
    type: 'text',
    required: true,
  },
  {
    name: 'texto',
    type: 'textarea',
  },
  {
    name: 'bullets',
    type: 'array',
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

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  imageURL: '/block-previews/cta-banner.svg',
  imageAltText: 'Banda de llamado a la acción con título y botón centrado',
  fields: ctaBannerFields,
}
