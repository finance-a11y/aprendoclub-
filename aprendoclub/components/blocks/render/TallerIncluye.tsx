'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { Card } from '@/components/ui/card'
import type { TallerIncluyeBlock as TallerIncluyeBlockType } from '@/payload-types'

/**
 * Render de 'tallerIncluye': grid de items[]{texto,valor}.
 * Espeja la sección "Qué incluye" de
 * app/(frontend)/(site)/programas/taller-seo-con-ia/page.tsx.
 */
export function TallerIncluye({ block }: { block: TallerIncluyeBlockType }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="container-padding section-spacing max-w-6xl mx-auto w-full">
      <h2 className="mb-8 text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
        Qué incluye
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {block.items.map((item, i) => (
          <BlurFade key={item.id ?? i} delay={i * 0.08} isInView={isInView}>
            <Card padding="compact" hover="none" className="flex items-start gap-4">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                <Check className="h-5 w-5 text-[var(--accent)]" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm leading-relaxed text-gray-300">{item.texto}</p>
                {item.valor && <span className="text-xs text-gray-400">{item.valor}</span>}
              </div>
            </Card>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

export default TallerIncluye
