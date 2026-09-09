import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import config from '../payload.config'

const PHOTOS_DIR = '/private/tmp/claude-501/-Users-juan-Documents-Codigo-Arianna-aprendoclub/528882d3-69b3-49f8-bbaa-24918a4a6114/scratchpad/photos'

async function uploadImage(payload: any, filePath: string, alt: string) {
  const buffer = fs.readFileSync(filePath)
  const filename = path.basename(filePath).toLowerCase().replace(/\s+/g, '-')
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/jpeg',
      name: filename,
      size: buffer.length,
    },
  })
  console.log('[upload]', filename, '->', doc.id, doc.url)
  return doc
}

async function run() {
  const payload = await getPayload({ config })

  const danaDoc = await uploadImage(
    payload,
    path.join(PHOTOS_DIR, 'Ari y Dana/DANA.jpg'),
    'Dana Aliaga, SEO Specialist en aprendoclub',
  )

  const { docs } = await payload.find({
    collection: 'team-members',
    where: { nombre: { equals: 'Dana Aliaga' } },
    limit: 1,
  })
  if (!docs.length) throw new Error('Dana Aliaga no encontrada en team-members')

  await payload.update({
    collection: 'team-members',
    id: docs[0].id,
    data: { foto: danaDoc.id },
    context: { disableRevalidate: true },
  })
  console.log('[team-members] Dana Aliaga foto actualizada ->', danaDoc.id)
}

await run()
