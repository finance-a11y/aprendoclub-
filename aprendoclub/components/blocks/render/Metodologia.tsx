import { Eyebrow } from '@/components/ui/eyebrow'
import type { MetodologiaBlock as MetodologiaBlockType } from '@/payload-types'

/**
 * Render de 'metodologia': eyebrow/titulo + pilares[]{nombre,descripcion}.
 * Espeja components/quienes-somos/metodologia.tsx.
 */
export function Metodologia({ block }: { block: MetodologiaBlockType }) {
  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl">
        {block.pilares.map((pilar, index) => (
          <div
            key={pilar.id ?? index}
            className="rounded-xl bg-[var(--surface-card)] border border-[var(--border-card)] p-6"
          >
            <span className="text-sm font-semibold text-white/40">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-semibold text-white">{pilar.nombre}</h3>
            <p className="mt-2 text-gray-400 leading-relaxed">{pilar.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Metodologia
