import type { StatsBlock as StatsBlockType } from '@/payload-types'

/**
 * Render de 'stats': grid de items {value,label}.
 * Espeja components/quienes-somos/stats.tsx.
 */
export function Stats({ block }: { block: StatsBlockType }) {
  const items = block.items ?? []
  if (items.length === 0) return null

  return (
    <section className="flex w-full flex-col items-center bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {items.map((stat, i) => (
          <div
            key={stat.id ?? i}
            className="flex flex-col items-center text-center"
          >
            <span className="text-4xl md:text-5xl font-semibold text-white">
              {stat.value}
            </span>
            <span className="text-sm text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
