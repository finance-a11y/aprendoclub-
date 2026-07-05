import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { AgendaBlock as AgendaBlockType } from '@/payload-types'

/**
 * Render de 'agenda': items[]{dia,titulo,descripcion,imagen} (7 días).
 * Espeja la sección "Agenda 7 días" de components/reto/reto-mid.tsx.
 */
export function Agenda({ block }: { block: AgendaBlockType }) {
  const items = block.items ?? []

  return (
    <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Eyebrow>AGENDA</Eyebrow>
          <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            7 días para cambiar tu rumbo
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d, i) => {
            const imagen = resolveMedia(d.imagen)
            return (
              <div
                key={d.id ?? i}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-card)]"
              >
                {imagen && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={imagen.url}
                      alt={`${d.dia}: ${d.titulo}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 p-5">
                  <Eyebrow>{d.dia}</Eyebrow>
                  <h3 className="text-base font-semibold text-white">{d.titulo}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{d.descripcion}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Agenda
