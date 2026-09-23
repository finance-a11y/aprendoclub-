import { getPayload } from 'payload'
import config from '../payload.config'

const REPLACEMENTS: [string, string][] = [
  // Rename (longest/most specific first)
  ['Diplomado de cero a SEO', 'Diplomado SEO + AIO'],
  ['Diplomado de Cero a SEO', 'Diplomado SEO + AIO'],
  ['Diplomado de SEO + AIO', 'Diplomado SEO + AIO'],
  // Student-count copy
  ['+10.000 estudiantes ya se unieron', '+10,000 estudiantes ya se unieron'],
  ['4.9/5 de +10.000 estudiantes', '4.9/5 de +10,000 estudiantes'],
  ['más de 2,000 estudiantes', 'más de 10,000 estudiantes'],
  ['Hoy más de 2.000 personas', 'Hoy más de 10,000 personas'],
  ['más de 2.000 personas', 'más de 10,000 personas'],
  [
    'Aprende con una metodología probada por más de 2,000 profesionales',
    'Aprende con una metodología probada por más de 10,000 estudiantes',
  ],
  [
    'Hoy, más de 750 personas se han formado con nosotros.',
    'Hoy, más de 3,000 estudiantes se han formado con nosotros en el Diplomado.',
  ],
  ['"2,000+"', '"10,000+"'],
]

function applyReplacements(json: string): { result: string; changed: boolean } {
  let result = json
  for (const [oldStr, newStr] of REPLACEMENTS) {
    if (result.includes(oldStr)) result = result.replaceAll(oldStr, newStr)
  }
  return { result, changed: result !== json }
}

async function run() {
  const payload = await getPayload({ config })

  // pages
  const { docs: pages } = await payload.find({ collection: 'pages', depth: 0, limit: 200 })
  for (const doc of pages) {
    const layoutJson = JSON.stringify((doc as any).layout ?? null)
    const metaJson = JSON.stringify((doc as any).meta ?? null)
    const layoutR = applyReplacements(layoutJson)
    const metaR = applyReplacements(metaJson)
    if (layoutR.changed || metaR.changed) {
      await payload.update({
        collection: 'pages',
        id: doc.id,
        data: {
          ...(layoutR.changed ? { layout: JSON.parse(layoutR.result) } : {}),
          ...(metaR.changed ? { meta: JSON.parse(metaR.result) } : {}),
        },
        context: { disableRevalidate: true },
      })
      console.log('[update-diplomado-copy-live] pages updated:', (doc as any).slug ?? doc.id)
    }
  }

  // programas
  const { docs: programas } = await payload.find({ collection: 'programas', depth: 0, limit: 200 })
  for (const doc of programas) {
    const { id, createdAt, updatedAt, ...rest } = doc as any
    const json = JSON.stringify(rest)
    const r = applyReplacements(json)
    if (r.changed) {
      await payload.update({
        collection: 'programas',
        id: doc.id,
        data: JSON.parse(r.result),
        context: { disableRevalidate: true },
      })
      console.log('[update-diplomado-copy-live] programas updated:', (doc as any).slug ?? doc.id)
    }
  }

  // llms global
  const llms = await payload.findGlobal({ slug: 'llms' as any })
  const txtR = applyReplacements(JSON.stringify((llms as any).llmsTxt ?? ''))
  const fullR = applyReplacements(JSON.stringify((llms as any).llmsFull ?? ''))
  if (txtR.changed || fullR.changed) {
    await payload.updateGlobal({
      slug: 'llms' as any,
      data: {
        ...(txtR.changed ? { llmsTxt: JSON.parse(txtR.result) } : {}),
        ...(fullR.changed ? { llmsFull: JSON.parse(fullR.result) } : {}),
      },
      context: { disableRevalidate: true },
    })
    console.log('[update-diplomado-copy-live] llms global updated')
  }

  console.log('[update-diplomado-copy-live] done')
}

await run()
