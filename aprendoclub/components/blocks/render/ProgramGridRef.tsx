import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { resolveMedia } from '@/lib/blocks/media'
import type { Programa, ProgramGridRefBlock as ProgramGridRefBlockType } from '@/payload-types'

/**
 * Render de 'programGridRef': sectionHeader + botón + grid de `items`
 * (docs `programas`). Espeja components/programas-section.tsx usando
 * components/program-card.tsx como referencia (duplicado aquí porque
 * ProgramCard tipa contra lib/programas.ts, no contra payload-types).
 */
export function ProgramGridRef({ block }: { block: ProgramGridRefBlockType }) {
  const items = (block.items ?? []).filter(
    (item): item is Programa => typeof item === 'object' && item !== null,
  )

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4">
        {block.eyebrow && <Eyebrow className="tracking-[0.2em]">{block.eyebrow}</Eyebrow>}
        <h2 className="text-center text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        {block.subtitulo && (
          <p className="text-center text-lg text-gray-400">{block.subtitulo}</p>
        )}
      </div>

      {items.length > 0 && (
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {items.map((program) => {
            const portada = resolveMedia(program.imagen)
            const isComingSoon = Boolean(program.comingSoon)
            return (
            <Card
              key={program.id}
              padding="compact"
              hover="liftAccent"
              className="group relative flex h-full flex-col gap-4"
            >
              {isComingSoon && (
                <span className="absolute top-3 right-3 z-10 rounded-full border border-white/20 bg-black/70 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Próximamente
                </span>
              )}

              {portada && (
                <div className="relative -mx-6 -mt-6 mb-2 aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={portada.url}
                    alt={portada.alt || program.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <Eyebrow>{program.badge}</Eyebrow>

              <h3 className="text-lg font-semibold text-white">{program.nombre}</h3>

              <p className="text-sm leading-relaxed text-gray-400">
                {program.descripcion}
              </p>

              <div className="mt-2 flex flex-col gap-0.5">
                <span className="text-white font-semibold">{program.precio}</span>
                {program.precioNota && (
                  <span className="text-gray-400 text-xs">{program.precioNota}</span>
                )}
              </div>

              {isComingSoon ? (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="mt-auto inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/20 bg-[var(--surface-card)] px-6 py-3 text-sm font-semibold text-white opacity-60"
                >
                  Próximamente
                </button>
              ) : (
                <Button href={program.ctaHref} variant="primary" icon className="mt-auto">
                  {program.ctaLabel}
                </Button>
              )}
            </Card>
            )
          })}
        </div>
      )}

      <Button href={block.boton.href} variant="secondary" icon>
        {block.boton.label}
      </Button>
    </section>
  )
}

export default ProgramGridRef
