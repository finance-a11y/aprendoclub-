import { Eyebrow } from '@/components/ui/eyebrow'
import type { ComparativaTablaBlock as ComparativaTablaBlockType } from '@/payload-types'

/**
 * Render de 'comparativaTabla': tabla nosotros-vs-otras (nombre / lo que
 * ofrecen / lo que no tienen). Scroll horizontal en mobile.
 */
export function ComparativaTabla({ block }: { block: ComparativaTablaBlockType }) {
  const filas = block.filas ?? []
  if (filas.length === 0) return null

  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        {block.subtitulo && <p className="text-lg text-gray-400">{block.subtitulo}</p>}
      </div>

      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl border border-[var(--border-card)]">
          <thead>
            <tr className="bg-[var(--bg-tertiary)]">
              <th className="p-4 text-left text-sm font-semibold text-white">VS.</th>
              <th className="p-4 text-left text-sm font-semibold text-white">
                {block.colOfrecenLabel}
              </th>
              <th className="p-4 text-left text-sm font-semibold text-white">
                {block.colFaltaLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={fila.id ?? i} className="border-t border-[var(--border-card)]">
                <td className="p-4 align-top text-sm font-semibold text-white">{fila.nombre}</td>
                <td className="p-4 align-top text-sm leading-relaxed text-gray-400">
                  {fila.ofrecen}
                </td>
                <td className="p-4 align-top text-sm leading-relaxed text-gray-400">
                  {fila.falta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ComparativaTabla
