import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Verificación de DB en vivo (Phase 28-02, gap closure): confirma por SQL
 * directa contra Neon (no por logs del seed) que ningún registro de la
 * tabla `media` retiene el nombre viejo del diplomado en `alt`, y que los
 * 3 assets del diplomado muestran el nombre nuevo.
 *
 * Corre vía `payload run scripts/verify-media-alt.ts` (mismo patrón de
 * top-level await que scripts/seed.ts: sin él, `payload run` mata el
 * proceso antes de que el módulo llegue a hacer nada).
 */
async function run() {
  const payload = await getPayload({ config })

  // Query 1 (gate): ningún alt debe retener el nombre viejo, con o sin "de".
  const stale = await payload.db.pool.query(
    `SELECT id, filename, alt FROM media WHERE alt ~* 'diplomado (de )?cero a seo'`,
  )

  // Query 2 (confirmación positiva): los 3 assets del diplomado con el nombre nuevo.
  const diplomadoAssets = await payload.db.pool.query(
    `SELECT id, filename, alt FROM media WHERE filename IN ('diplomado-hero.avif','diplomado-certificado.avif','diplomado-modulos2.avif') ORDER BY filename`,
  )

  console.log('\n[verify-media-alt] Query 1 (gate) — registros con nombre viejo en alt:')
  console.table(stale.rows)

  console.log('\n[verify-media-alt] Query 2 (confirmación) — assets del diplomado:')
  console.table(diplomadoAssets.rows)

  await payload.destroy()

  if (stale.rows.length >= 1) {
    console.error(
      `\n[verify-media-alt] FALLÓ: ${stale.rows.length} registro(s) de media retienen el nombre viejo en alt.`,
    )
    process.exit(1)
  }

  console.log('\n[verify-media-alt] OK: ningún registro de media retiene el nombre viejo en alt.')
  process.exit(0)
}

try {
  await run()
} catch (error) {
  console.error('[verify-media-alt] ERROR:', error)
  process.exitCode = 1
}
