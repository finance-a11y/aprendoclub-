import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'programas',
    where: { slug: { equals: 'reto' } },
    limit: 1,
  })
  if (!docs.length) {
    console.warn('[set-reto-coming-soon] no se encontró el programa con slug "reto"')
    return
  }
  const doc = docs[0] as any
  await payload.update({
    collection: 'programas',
    id: doc.id,
    data: { comingSoon: true },
    context: { disableRevalidate: true },
  })
  console.log('[set-reto-coming-soon] comingSoon=true aplicado a', doc.nombre ?? doc.id)
}

await run()
