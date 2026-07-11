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
  const items = block.items ?? []
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const isImageMode = item.iconMode === 'image'
            const media =
              isImageMode && item.image && typeof item.image === 'object' ? item.image : null

            return (
              <BlurFade key={item.id ?? i} delay={i * 0.08} isInView={isInView}>
              <div
                className={`rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 ${
                  i >= 3 ? 'lg:col-span-1' : ''
                }`}
              >
                {isImageMode ? (
                  media && media.url ? (
                    <div className="mb-4 h-12 w-12 rounded-xl bg-white/5 p-2">
                      <Image
                        src={media.url}
                        alt={media.alt ?? item.titulo}
                        width={typeof media.width === 'number' ? media.width : 48}
                        height={typeof media.height === 'number' ? media.height : 48}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 h-12 w-12 rounded-xl border border-dashed border-white/20" />
                  )
                ) : (
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
