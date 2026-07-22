import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { MentoraBlock as MentoraBlockType } from '@/payload-types'

/**
 * Render de 'mentora': nombre/rol/stats[]/historia/quote/cierre/foto.
 * Espeja la sección Mentora de components/reto/reto-top.tsx (layout 2
 * columnas con .measure-prose).
 */
export function Mentora({ block }: { block: MentoraBlockType }) {
  const stats = block.stats ?? []
  const foto = resolveMedia(block.foto)

  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
      {foto && (
        <div className="relative mx-auto w-full max-w-sm">
          <Image
            src={foto.url}
            alt={foto.alt || block.nombre}
            width={520}
            height={640}
            className="h-auto w-full rounded-2xl object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Eyebrow>{block.rol}</Eyebrow>
          <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
            {block.nombre}
          </h2>
        </div>
        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.id ?? i}
                className="rounded-xl border border-white/10 bg-[var(--surface-card)] p-4"
              >
                <p className="text-xl font-semibold text-white">{s.valor}</p>
                <p className="text-xs text-gray-400">{s.etiqueta}</p>
              </div>
            ))}
          </div>
        )}
        <p className="leading-relaxed text-gray-400 measure-prose">{block.historia}</p>
        <blockquote className="border-l-2 border-[var(--accent)] pl-4 text-lg font-medium italic text-white">
          {block.quote}
        </blockquote>
        <p className="leading-relaxed text-gray-400 measure-prose">{block.cierre}</p>
      </div>
    </section>
  )
}

export default Mentora
