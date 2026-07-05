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
import { Programas } from './collections/Programas'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonios } from './collections/Testimonios'

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
  collections: [Users, Media, Testimonios, ClientesTrabajados, Programas, TeamMembers, Faq],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // Collections/globals target sets are finalized in Phase 14 once content
    // collections (BlogPost, Category, etc.) exist. Loaded here empty so the
    // plugins register and their schema is ready to extend.
    seoPlugin({
      collections: [],
      uploadsCollection: 'media',
    }),
    // redirectsPlugin's `to.reference` relationship field targets the
    // `programas` collection: the only slug-based content collection that
    // represents standalone pages today.
    redirectsPlugin({
      collections: ['programas'],
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
