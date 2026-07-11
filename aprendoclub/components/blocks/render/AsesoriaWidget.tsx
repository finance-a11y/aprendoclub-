'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { useInView } from 'framer-motion'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { AsesoriaWidgetBlock as AsesoriaWidgetBlockType } from '@/payload-types'

/**
 * Render de 'asesoriaWidget': eyebrow + título + subtítulo + checklist de
 * bullets + CTA a WhatsApp (href configurable desde Payload, ADV-03).
 * Reemplaza la sección de precios del home (ADV-01/ADV-02); ancla #asesoria
 * consumida por las 3 refs reparadas en el seed (ADV-04).
 */
export function AsesoriaWidget({ block }: { block: AsesoriaWidgetBlockType }) {
  const href = block.boton?.href ?? '#'
  const label = block.boton?.label ?? ''

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      id="asesoria"
      className="relative bg-[var(--bg-primary)] container-padding section-spacing"
    >
      <div className="mx-auto max-w-3xl">
        <BlurFade isInView={isInView}>
        <Card padding="default" hover="none" className="relative overflow-hidden">
          <BorderBeam />
          <div className="flex flex-col items-center gap-8 text-center">
            {block.eyebrow && <Eyebrow as="p">{block.eyebrow}</Eyebrow>}

            <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
              {block.titulo}
            </h2>

            {block.subtitulo && (
              <p className="max-w-xl text-base leading-relaxed text-gray-300">
                {block.subtitulo}
              </p>
            )}

            {block.bullets && block.bullets.length > 0 && (
              <ul className="flex w-full flex-col gap-4 text-left md:grid md:grid-cols-2 md:gap-x-8">
                {block.bullets.map((bullet, i) => (
                  <li
                    key={bullet.id ?? i}
                    className="flex items-center gap-2 text-base text-gray-300"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {bullet.text}
                  </li>
                ))}
              </ul>
            )}

            {label && (
              <Button
                href={href}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-shimmer"
              >
                {label}
              </Button>
            )}
          </div>
        </Card>
        </BlurFade>
      </div>
    </section>
  )
}

export default AsesoriaWidget
