'use client'

import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useInView } from 'framer-motion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { BlurFade } from '@/components/ui/blur-fade'
import type { DiplomadoBenefitsBlock as DiplomadoBenefitsBlockType } from '@/payload-types'

/**
 * Render de 'diplomadoBenefits': eyebrow/título/subtítulo + items[]{texto,valor}
 * + extras[]. Espeja components/diplomado/benefits.tsx (grid de tarjetas
 * "valorado en $X" + lista de extras incluidos).
 */
export function DiplomadoBenefits({ block }: { block: DiplomadoBenefitsBlockType }) {
  const items = block.items ?? []
  const extras = block.extras ?? []
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        {block.eyebrow && (
          <div className="mb-4">
            <Eyebrow>{block.eyebrow}</Eyebrow>
          </div>
        )}

        <h2 className="max-w-3xl text-balance text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>

        {block.subtitulo && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            {block.subtitulo}
          </p>
        )}

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((benefit, i) => (
            <BlurFade key={benefit.id ?? i} delay={i * 0.08} isInView={isInView}>
            <div
              className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6"
            >
              {benefit.valor && (
                <div className="mb-3 inline-flex rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  VALORADO EN {benefit.valor}
                </div>
              )}
              <p className="text-sm leading-relaxed text-gray-400">{benefit.texto}</p>
            </div>
            </BlurFade>
          ))}
        </div>

        {extras.length > 0 && (
          <div className="mt-8 rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-8">
            <h3 className="mb-4 text-lg font-semibold text-white">También incluye:</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {extras.map((extra, i) => (
                <li key={extra.id ?? i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm leading-relaxed text-gray-400">{extra.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default DiplomadoBenefits
