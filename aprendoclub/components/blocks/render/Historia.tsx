import { Eyebrow } from '@/components/ui/eyebrow'
import type { HistoriaBlock as HistoriaBlockType } from '@/payload-types'

/**
 * Render de 'historia': eyebrow/titulo + parrafos[] + quote{texto,autor}.
 * Espeja components/quienes-somos/historia.tsx.
 */
export function Historia({ block }: { block: HistoriaBlockType }) {
  return (
    <section className="flex w-full flex-col items-center gap-12 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {block.titulo}
        </h2>
      </div>

      <div className="flex w-full max-w-3xl flex-col gap-6 measure-prose">
        {block.parrafos.map((parrafo, index) => (
          <p key={parrafo.id ?? index} className="text-gray-400 leading-relaxed">
            {parrafo.texto}
          </p>
        ))}

        <blockquote className="mt-4 border-l-2 border-white/15 pl-6">
          <p className="text-xl md:text-2xl text-white font-medium italic">
            &ldquo;{block.quote.texto}&rdquo;
          </p>
          <cite className="mt-3 block text-sm text-gray-400 not-italic">
            {block.quote.autor}
          </cite>
        </blockquote>
      </div>
    </section>
  )
}

export default Historia
