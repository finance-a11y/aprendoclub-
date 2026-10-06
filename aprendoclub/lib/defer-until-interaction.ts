const EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const

/**
 * Ejecuta `load` una sola vez: en la primera interacción (clic, tecla, scroll,
 * toque) o, como respaldo, tras `fallbackMs` para no perder visitas que no
 * interactúan. Devuelve la función de limpieza.
 */
export function deferUntilInteraction(load: () => void, fallbackMs = 4000): () => void {
  let done = false
  const run = () => {
    if (done) return
    done = true
    cleanup()
    load()
  }
  const timer = window.setTimeout(run, fallbackMs)
  EVENTS.forEach((e) => window.addEventListener(e, run, { passive: true, once: true }))
  function cleanup() {
    window.clearTimeout(timer)
    EVENTS.forEach((e) => window.removeEventListener(e, run))
  }
  return cleanup
}
