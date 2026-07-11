import type { Block, Field } from 'payload'

/**
 * Reference block: pulls client logos from the `clientes-trabajados`
 * collection (Plan 01).
 */
export const logosRefFields: Field[] = [
  {
    name: 'texto',
    type: 'text',
    admin: {
      description: 'Ej. "Profesionales de empresas como"',
    },
  },
  {
    name: 'items',
    type: 'relationship',
    relationTo: 'clientes-trabajados',
    hasMany: true,
  },
]

export const LogosRefBlock: Block = {
  slug: 'logosRef',
  interfaceName: 'LogosRefBlock',
  labels: {
    singular: 'Logos (referencia)',
    plural: 'Logos (referencia)',
  },
  imageURL: '/block-previews/gallery-grid.svg',
  imageAltText: 'Mosaico de imágenes de tamaños desiguales',
  fields: logosRefFields,
}
