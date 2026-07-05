import type { CollectionConfig } from 'payload'

export const ClientesTrabajados: CollectionConfig = {
  slug: 'clientes-trabajados',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'orden'],
  },
  defaultSort: 'orden',
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'orden',
      type: 'number',
    },
  ],
}

export default ClientesTrabajados
