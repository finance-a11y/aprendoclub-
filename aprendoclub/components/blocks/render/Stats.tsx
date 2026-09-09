import { Eyebrow } from '@/components/ui/eyebrow'
import type { StatsBlock as StatsBlockType } from '@/payload-types'

/**
 * Render de 'stats': header opcional (eyebrow/headerTitulo/subtitulo) + grid
 * de items {value,titulo?,label}. Espeja components/quienes-somos/stats.tsx.
 */
export function Stats({ block }: { block: StatsBlockType }) {
  const items = block.items ?? []
  if (items.length === 0) return null

  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[var(--bg-secondary)] container-padding section-spacing">
      {(block.eyebrow || block.headerTitulo) && (
        <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.headerTitulo && (
            <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
              {block.headerTitulo}
            </h2>
          )}
          {block.subtitulo && <p className="text-lg text-gray-400">{block.subtitulo}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {items.map((stat, i) => (
          <div
            key={stat.id ?? i}
            className="flex max-w-[220px] flex-col items-center text-center"
          >
            <span className="text-4xl md:text-5xl font-semibold text-[var(--primary)]">
              {stat.value}
            </span>
            {stat.titulo && (
              <span className="mt-1 font-semibold text-white">{stat.titulo}</span>
            )}
            <span className="text-sm text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
