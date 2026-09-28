// Corre `payload migrate` solo si el commit toca migrations/ (o si no se puede saber).
// Evita despertar Neon y gastar cuota en cada push que no cambia el esquema.
import { execSync } from 'node:child_process'

const run = (cmd) => execSync(cmd, { stdio: 'inherit' })

function migrationsChanged() {
  if (process.env.FORCE_MIGRATE === '1') return true
  try {
    execSync('git diff --quiet HEAD^ HEAD -- migrations', { stdio: 'ignore' })
    return false // exit 0: sin cambios
  } catch (err) {
    // status 1 = hay cambios; cualquier otro error = no sabemos, migramos por seguridad
    return true
  }
}

if (migrationsChanged()) {
  console.log('[migrate] migrations/ cambió (o no se pudo comparar): ejecutando payload migrate')
  run('npx payload migrate')
} else {
  console.log('[migrate] sin cambios en migrations/: se omite payload migrate')
}
