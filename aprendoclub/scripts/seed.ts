import { getPayload } from 'payload'

import config from '../payload.config'
import { seedCollections } from './seed/collections'
import { seedGlobals } from './seed/globals'
import { seedMedia } from './seed/media'
import { seedPages } from './seed/pages'

/**
 * Orquestador del seed (MIG-01, revisado R07). Corre por Local API (`payload
 * run scripts/seed.ts`), sin login de admin:
 * getPayload -> media -> collections -> globals (site-settings) -> pages.
 *
 * Idempotente: cada paso hace upsert por clave natural (filename/nombre/slug/
 * question+page) o `updateGlobal` (idempotente por naturaleza). Re-correrlo no
 * duplica datos.
 *
 * NO cutover: el sitio sigue leyendo content/*.ts. Este script solo puebla Payload.
 */
/**
 * `payload run` hace `await import(scriptPath)`: si el módulo no tiene un
 * top-level await, el import se resuelve apenas termina el código síncrono
 * y el bin llama `process.exit(0)` de inmediato, matando el proceso antes de
 * que este script llegue a hacer nada. Por eso el `await run()` de abajo va
 * a nivel de módulo (top-level await), no como promesa flotante.
 */
async function run() {
  const payload = await getPayload({ config })

  console.log('\n[seed] === 1/4 Media ===')
  const mediaMap = await seedMedia(payload)

  console.log('\n[seed] === 2/4 Colecciones ===')
  const collectionMaps = await seedCollections(payload, mediaMap)

  console.log('\n[seed] === 3/4 Globals (site-settings) ===')
  await seedGlobals(payload, mediaMap, collectionMaps)

  console.log('\n[seed] === 4/4 Pages ===')
  await seedPages(payload, mediaMap, collectionMaps)

  console.log('\n[seed] Completado sin errores.')
  await payload.destroy()
}

try {
  await run()
} catch (error) {
  console.error('[seed] FALLÓ:', error)
  process.exitCode = 1
}
