import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const ClientesTrabajados: CollectionConfig = {
  slug: 'clientes-trabajados',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'orden'],
  },
  defaultSort: 'orden',
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/')
      },
    ],
    afterDelete: [
      ({ req }) => {
        if (req?.context?.disableRevalidate) return
        revalidatePath('/')
      },
    ],
  },
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
