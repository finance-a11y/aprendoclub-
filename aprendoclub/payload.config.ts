import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { ClientesTrabajados } from './collections/ClientesTrabajados'
import { Faq } from './collections/Faq'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Programas } from './collections/Programas'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonios } from './collections/Testimonios'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Users = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
}

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Users, Media, Testimonios, ClientesTrabajados, Programas, TeamMembers, Faq, Pages],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    // Producción: las migraciones son la única fuente de cambios de schema.
    // Evita el auto-push de dev (y su prompt interactivo y/N en `payload migrate`),
    // que colgaría el build en Vercel. Correr `payload migrate:create` tras cambios de schema.
    push: false,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // SEO tab por página: attach a la colección `pages` (page-builder, Plan R02).
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
    }),
    // redirectsPlugin's `to.reference` relationship field targets `programas`
    // (colección de datos con slug) y `pages` (page-builder, Plan R02).
    redirectsPlugin({
      collections: ['programas', 'pages'],
    }),
    nestedDocsPlugin({
      collections: [],
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
