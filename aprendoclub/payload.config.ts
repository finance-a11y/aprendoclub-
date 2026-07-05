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

import { Media } from './collections/Media'

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
  collections: [Users, Media],
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
    // redirectsPlugin's `to.reference` relationship field requires at least
    // one target collection; `media` is a placeholder until content
    // collections (pages/blog-posts) land in Phase 14.
    redirectsPlugin({
      collections: ['media'],
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
