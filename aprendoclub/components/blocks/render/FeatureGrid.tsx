import { Eyebrow } from '@/components/ui/eyebrow'
import { LucideIcon } from '@/lib/blocks/icons'
import type { FeatureGridBlock as FeatureGridBlockType } from '@/payload-types'

/**
 * Render de 'featureGrid' (genérico): sectionHeader (eyebrow/titulo/subtitulo)
 * + grid de tarjetas con icono (items[]{icon,titulo,descripcion}).
 * Espeja components/problema-section.tsx (grid de 6 tarjetas con icono lucide).
 * Consumido por problema y beneficios (home) y origin/methodology (diplomado);
 * el ajuste fino de variante visual entre problema/beneficios se hace en el
 * cutover (Phase 17).
 */
export function FeatureGrid({ block }: { block: FeatureGridBlockType }) {
  const items = block.items ?? []

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h2 className="text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        {block.subtitulo && (
          <p className="text-center text-lg text-gray-400">{block.subtitulo}</p>
        )}
      </div>

      {items.length > 0 && (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {items.map((item, index) => {
            return (
              <div
                key={item.id ?? index}
                className="group h-full flex flex-col gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:-translate-y-1"
              >
                <div className="w-fit rounded-xl bg-[var(--primary)]/10 p-3">
                  <LucideIcon name={item.icon} className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.titulo}</h3>
                {item.descripcion && (
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.descripcion}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default FeatureGrid
