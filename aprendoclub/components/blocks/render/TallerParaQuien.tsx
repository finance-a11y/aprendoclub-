'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { BlurFade } from '@/components/ui/blur-fade'
import type { TallerParaQuienBlock as TallerParaQuienBlockType } from '@/payload-types'

/**
 * Render de 'tallerParaQuien': texto.
 * Espeja la sección "¿Para quién es?" de
 * app/(frontend)/(site)/programas/taller-seo-con-ia/page.tsx.
 */
export function TallerParaQuien({ block }: { block: TallerParaQuienBlockType }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="container-padding section-spacing max-w-6xl mx-auto w-full">
      <BlurFade delay={0} isInView={isInView}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            ¿Para quién es?
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">{block.texto}</p>
        </div>
      </BlurFade>
    </section>
  )
}

export default TallerParaQuien
