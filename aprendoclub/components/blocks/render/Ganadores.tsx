import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { GanadoresBlock as GanadoresBlockType } from '@/payload-types'

/**
 * Render de 'ganadores': ganadoresIntro + ganadores[]{nombre,edicion,imagen}.
 * Espeja la sección "Ganadores" de components/reto/reto-mid.tsx.
 */
export function Ganadores({ block }: { block: GanadoresBlockType }) {
  const ganadores = block.ganadores ?? []

  return (
    <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Eyebrow>GANADORES</Eyebrow>
          <p className="max-w-2xl leading-relaxed text-gray-400 measure-prose">
            {block.ganadoresIntro}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {ganadores.map((g, i) => {
            const imagen = resolveMedia(g.imagen)
            return (
              <div
                key={g.id ?? i}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-card)]"
              >
                {imagen && (
                  <div className="relative aspect-square w-full">
                    <Image src={imagen.url} alt={g.nombre} fill className="object-cover" />
                  </div>
                )}
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-sm font-semibold text-white">{g.nombre}</h3>
                  <span className="text-xs text-gray-400">{g.edicion}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Ganadores
