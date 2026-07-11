'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { BlurFade } from '@/components/ui/blur-fade'
import { LucideIcon } from '@/lib/blocks/icons'
import type { HowItWorksBlock as HowItWorksBlockType } from '@/payload-types'

/**
 * Render de 'howItWorks': eyebrow/título + items[]{icon,titulo,descripcion,
 * iconMode,image} + ctaLabel/ctaHref. Espeja components/diplomado/how-it-works.tsx
 * (grid de tarjetas 2/3 columnas + CTA final). iconMode 'image' (IMG-01, Phase
 * 24, assets reales desde 24-02) reusa el mismo patrón de recorte 12x12 que
 * FeatureGrid.tsx en vez del ícono lucide.
 */
export function HowItWorks({ block }: { block: HowItWorksBlockType }) {
  // Cards con imagen van primero (fila de arriba), cards con ícono después —
  // pedido explícito de Juan tras revisar /diplomado. Sort estable: preserva
  // el orden relativo dentro de cada grupo.
  const items = [...(block.items ?? [])].sort((a, b) => {
    const aImage = a.iconMode === 'image' ? 0 : 1
    const bImage = b.iconMode === 'image' ? 0 : 1
    return aImage - bImage
  })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        {block.eyebrow && <Eyebrow className="mb-4 block">{block.eyebrow}</Eyebrow>}

        <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
          {block.titulo}
        </h2>
        {block.subtitulo && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            {block.subtitulo}
          </p>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {items.map((item, i) => {
            const isImageMode = item.iconMode === 'image'
            const media =
              isImageMode && item.image && typeof item.image === 'object' ? item.image : null

            return (
              <BlurFade
                key={item.id ?? i}
                delay={i * 0.08}
                isInView={isInView}
                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
              <div className="h-full overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)]">
                {isImageMode ? (
                  media && media.url ? (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={media.url}
                        alt={media.alt ?? item.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full border-b border-dashed border-white/20" />
                  )
                ) : null}
                <div className="p-6">
                  {!isImageMode && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                      <LucideIcon name={item.icon} className="h-6 w-6 text-[var(--primary-light)]" />
                    </div>
                  )}
                  <h3 className="mb-2 font-semibold text-white">{item.titulo}</h3>
                  {item.descripcion && (
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.descripcion}
                    </p>
                  )}
                </div>
              </div>
              </BlurFade>
            )
          })}
        </div>

        {block.ctaLabel && block.ctaHref && (
          <div className="mt-10 text-center">
            <Button
              href={block.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              {block.ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default HowItWorks
