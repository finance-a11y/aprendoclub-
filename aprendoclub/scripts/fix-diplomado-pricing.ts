import { getPayload } from 'payload'
import config from '../payload.config'

/** Fix: $90/mes era pricing de suscripción (Webflow, ya no existe).
 * Real: pago único $780 o 4 cuotas de $210 (fuente: public/diplomado/seo/aio/index.html). */
async function run() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'diplomado' } },
    limit: 1,
    depth: 0,
  })
  if (!docs.length) throw new Error('diplomado page not found')
  const page: any = docs[0]
  const layout = page.layout.map((b: any) => {
    if (b.blockType !== 'diplomadoPricing') return b
    return {
      ...b,
      precio: '$780',
      precioTachado: undefined,
      precioNota: 'pago único · o 4 cuotas de $210',
    }
  })
  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout },
    context: { disableRevalidate: true },
  })
  console.log('[fix-diplomado-pricing] OK')
}

await run()
