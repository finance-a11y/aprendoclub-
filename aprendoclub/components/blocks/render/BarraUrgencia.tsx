import type { BarraUrgenciaBlock as BarraUrgenciaBlockType } from '@/payload-types'

/**
 * Render de 'barraUrgencia': texto de la barra superior de urgencia.
 * Espeja la barra de urgencia en components/reto/reto-top.tsx.
 */
export function BarraUrgencia({ block }: { block: BarraUrgenciaBlockType }) {
  return (
    <div className="w-full border-b border-white/10 bg-[var(--surface-card)]">
      <p className="container-padding mx-auto max-w-6xl py-2.5 text-center text-xs font-medium text-gray-300 sm:text-sm">
        {block.texto}
      </p>
    </div>
  )
}

export default BarraUrgencia
