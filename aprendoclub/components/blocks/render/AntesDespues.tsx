import { Eyebrow } from '@/components/ui/eyebrow'
import { Check, X } from 'lucide-react'
import type { AntesDespuesBlock as AntesDespuesBlockType } from '@/payload-types'

/**
 * Render de 'antesDespues': dos columnas de bullets (antes/después),
 * separadas por una flecha en desktop.
 */
export function AntesDespues({ block }: { block: AntesDespuesBlockType }) {
  const antes = block.antes ?? []
  const despues = block.despues ?? []
  if (antes.length === 0 && despues.length === 0) return null

  return (
    <section className="flex w-full flex-col items-center gap-12 bg-[var(--bg-primary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-400">
            {block.antesLabel}
          </p>
          <ul className="flex flex-col gap-4">
            {antes.map((item, i) => (
              <li key={item.id ?? i} className="flex items-start gap-3">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm leading-relaxed text-gray-400">{item.texto}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden text-2xl text-[var(--primary)] lg:block" aria-hidden="true">
          →
        </div>

        <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--surface-card)] p-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            {block.despuesLabel}
          </p>
          <ul className="flex flex-col gap-4">
            {despues.map((item, i) => (
              <li key={item.id ?? i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                <span className="text-sm leading-relaxed text-gray-400">{item.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AntesDespues
