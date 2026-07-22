import { Check } from 'lucide-react'
import type { IncluyeBlock as IncluyeBlockType } from '@/payload-types'

/**
 * Render de 'incluye': items[]{text} (lista de incluye).
 * Espeja la sección "Todo esto incluye tu cupo" de
 * components/reto/reto-mid.tsx.
 */
export function Incluye({ block }: { block: IncluyeBlockType }) {
  const items = block.items ?? []

  return (
    <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          Todo esto incluye tu cupo
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.id ?? i}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[var(--surface-card)] p-5"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
              <span className="text-sm leading-relaxed text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Incluye
