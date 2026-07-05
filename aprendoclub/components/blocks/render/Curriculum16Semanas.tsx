'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Curriculum16SemanasBlock as Curriculum16SemanasBlockType } from '@/payload-types'

/**
 * Render de 'curriculum16Semanas': eyebrow + título + timeline acordeón de
 * `semanas[]` (numero/titulo/detalle). Espeja components/diplomado/curriculum.tsx
 * pixel-a-pixel (nodos numerados + línea conectora + panel expandible con
 * grid-rows para la animación de altura).
 */
export function Curriculum16Semanas({ block }: { block: Curriculum16SemanasBlockType }) {
  const [openWeek, setOpenWeek] = useState<number | null>(0)
  const semanas = block.semanas ?? []

  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        {block.eyebrow && <Eyebrow className="mb-4 block">{block.eyebrow}</Eyebrow>}

        <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
          {block.titulo}
        </h2>

        <ol className="mt-12 max-w-3xl">
          {semanas.map((w, i) => {
            const open = openWeek === i
            const last = i === semanas.length - 1
            return (
              <li key={w.id ?? i} className="flex gap-4 md:gap-5">
                {/* Node + connecting line */}
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 ${
                      open
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                        : 'border-[var(--border-card)] bg-[var(--surface-card)] text-[var(--primary-light)]'
                    }`}
                  >
                    {w.numero}
                  </span>
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="mt-1 w-px flex-1 bg-[var(--border-card)]"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={last ? 'flex-1' : 'flex-1 pb-6'}>
                  <button
                    onClick={() => setOpenWeek(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`week-panel-${i}`}
                    className="group flex w-full items-start gap-3 pt-1.5 text-left"
                  >
                    <span className="flex-1">
                      <span className="block text-xs font-medium uppercase tracking-[0.12em] text-[var(--primary-light)]">
                        Semana {w.numero}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-white transition-colors group-hover:text-white/90 md:text-base">
                        {w.titulo}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={`week-panel-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pt-2 text-sm leading-relaxed text-gray-400">
                        {w.detalle}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Curriculum16Semanas
