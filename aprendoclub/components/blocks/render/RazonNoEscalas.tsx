'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

import { BlurFade } from '@/components/ui/blur-fade'
import type { RazonNoEscalasBlock as RazonNoEscalasBlockType } from '@/payload-types'

/**
 * Render de 'razonNoEscalas': titulo/parrafo/frases[] (grid de 3 tarjetas).
 * Espeja la sección "Razón por la cual no escalas" de
 * components/reto/reto-top.tsx.
 */
export function RazonNoEscalas({ block }: { block: RazonNoEscalasBlockType }) {
  const frases = block.frases ?? []
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      className="bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        <p className="text-lg leading-relaxed text-gray-400">{block.parrafo}</p>
        {frases.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {frases.map((f, i) => (
              <BlurFade key={f.id ?? i} delay={i * 0.08} isInView={isInView}>
                <div className="rounded-xl border border-white/10 bg-[var(--surface-card)] p-6 text-sm font-medium leading-relaxed text-white">
                  {f.text}
                </div>
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RazonNoEscalas
