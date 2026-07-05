import { CheckCircle2 } from 'lucide-react'
import type { AudienceBlock as AudienceBlockType } from '@/payload-types'

/**
 * Render de 'audience': título/subtítulo + tituloPerfiles + perfiles[] +
 * tituloDudas + dudas[] + notaFinal. Espeja components/diplomado/audience.tsx
 * (grid de dos columnas: "está pensado para ti si..." y "¿también te has
 * preguntado esto?").
 */
export function Audience({ block }: { block: AudienceBlockType }) {
  const perfiles = block.perfiles ?? []
  const dudas = block.dudas ?? []

  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <h2 className="text-balance text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        {block.subtitulo && (
          <p className="mt-3 text-lg text-gray-400">{block.subtitulo}</p>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Who it's for */}
          <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-8">
            {block.tituloPerfiles && (
              <h3 className="mb-6 text-xl font-semibold text-white">
                {block.tituloPerfiles}
              </h3>
            )}
            <ul className="flex flex-col gap-4">
              {perfiles.map((item, i) => (
                <li key={item.id ?? i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="leading-relaxed text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common doubts */}
          <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-8">
            {block.tituloDudas && (
              <h3 className="mb-6 text-xl font-semibold text-white">
                {block.tituloDudas}
              </h3>
            )}
            <ul className="flex flex-col gap-4">
              {dudas.map((item, i) => (
                <li key={item.id ?? i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-gray-400">
                    ?
                  </span>
                  <span className="leading-relaxed text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>

            {block.notaFinal && (
              <p className="mt-6 rounded-xl bg-[var(--bg-secondary)] p-4 text-sm leading-relaxed text-gray-400">
                {block.notaFinal}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Audience
