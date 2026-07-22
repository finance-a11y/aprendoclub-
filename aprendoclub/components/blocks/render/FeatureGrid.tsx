'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'

import { BlurFade } from '@/components/ui/blur-fade'
import { Eyebrow } from '@/components/ui/eyebrow'
import { LucideIcon } from '@/lib/blocks/icons'
import type { FeatureGridBlock as FeatureGridBlockType } from '@/payload-types'

/**
 * Resuelve item.iconColor a un valor CSS de alto contraste. Default (auto/
 * accent/valor no reconocido) es var(--accent), el único token del sistema
 * con contraste garantizado contra el fondo dark fijo de la sección
 * (21-UI-SPEC.md, sección Color).
 */
function resolveIconColor(iconColor: string | null | undefined): string {
  switch (iconColor) {
    case 'white':
      return '#ffffff'
    case 'primary':
      return 'var(--primary)'
    case 'accent':
    case 'auto':
    default:
      return 'var(--accent)'
  }
}

/**
 * Render de 'featureGrid' (genérico): sectionHeader (eyebrow/titulo/subtitulo)
 * + grid de tarjetas con icono o imagen (items[]{icon,titulo,descripcion,
 * iconMode,iconColor,image}). Espeja components/problema-section.tsx (grid
 * de tarjetas con icono lucide). Consumido por problema y beneficios (home)
 * y origin/methodology (diplomado); howItWorks/benefits (diplomado) usan sus
 * propios bloques y componentes de render (no FeatureGrid). El ajuste fino de
 * variante visual entre problema/beneficios se hace en el cutover (Phase 17).
 */
export function FeatureGrid({ block }: { block: FeatureGridBlockType }) {
  const items = block.items ?? []
  const gridColsClass =
    items.length === 4
      ? 'grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl'
      : 'grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl'

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <div className="flex max-w-[700px] flex-col items-center gap-4">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h2 className="text-center text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        {block.subtitulo && (
          <p className="text-center text-lg text-gray-400">{block.subtitulo}</p>
        )}
      </div>

      {items.length > 0 && (
        <div className={gridColsClass}>
          {items.map((item, index) => {
            const isImageMode = item.iconMode === 'image'
            const media =
              isImageMode && item.image && typeof item.image === 'object' ? item.image : null
            const iconColor = resolveIconColor(item.iconColor)

            return (
              <BlurFade key={item.id ?? index} delay={index * 0.08} isInView={isInView}>
              <div
                className="group h-full flex flex-col gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[var(--shadow-lg)]"
              >
                {isImageMode ? (
                  media && media.url ? (
                    <div className="h-12 w-12 rounded-xl bg-white/5 p-2 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={media.url}
                        alt={media.alt ?? item.titulo}
                        width={typeof media.width === 'number' ? media.width : 48}
                        height={typeof media.height === 'number' ? media.height : 48}
                        className="h-full w-full object-contain"
                        // Íconos ilustrados chicos (8-15KB) — inmunes a la
                        // cuota de Vercel Image Optimization (Fase 29/31).
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-xl border border-dashed border-white/20" />
                  )
                ) : (
                  <div
                    className="w-fit rounded-xl p-3"
                    // color-mix() sin fallback: known-limitation aceptado. Tailwind v4
                    // (usado en este proyecto) ya requiere como baseline Safari 16.4+/
                    // Firefox 128+/Chrome 111+ (usa color-mix/@property internamente),
                    // por lo que no hay navegadores soportados por el proyecto sin
                    // soporte de color-mix().
                    style={{ backgroundColor: `color-mix(in srgb, ${iconColor} 10%, transparent)` }}
                  >
                    <LucideIcon name={item.icon} className="h-6 w-6" style={{ color: iconColor }} />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{item.titulo}</h3>
                {item.descripcion && (
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.descripcion}
                  </p>
                )}
              </div>
              </BlurFade>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default FeatureGrid
