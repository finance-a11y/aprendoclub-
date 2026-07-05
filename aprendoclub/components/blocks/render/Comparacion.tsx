import { Check, X } from 'lucide-react'
import type { ComparacionBlock as ComparacionBlockType } from '@/payload-types'

/**
 * Render de 'comparacion': items[]{deSiempre,elReto} (tabla comparativa de
 * 2 columnas). Espeja la sección "Comparación" de
 * components/reto/reto-mid.tsx (incl. la columna accent con borde y color
 * distintos para "El Reto 7 Días").
 */
export function Comparacion({ block }: { block: ComparacionBlockType }) {
  const items = block.items ?? []

  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[var(--surface-card)] p-8">
          <h3 className="mb-6 text-lg font-semibold text-gray-400">Lo de siempre</h3>
          <ul className="flex flex-col gap-4">
            {items.map((row, i) => (
              <li key={row.id ?? i} className="flex items-start gap-3 text-sm text-gray-400">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                {row.deSiempre}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface-card)] p-8">
          <h3 className="mb-6 text-lg font-semibold text-[var(--accent)]">El Reto 7 Días</h3>
          <ul className="flex flex-col gap-4">
            {items.map((row, i) => (
              <li key={row.id ?? i} className="flex items-start gap-3 text-sm text-white">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                {row.elReto}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Comparacion
