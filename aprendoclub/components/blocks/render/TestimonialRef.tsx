'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { useInView } from 'framer-motion'
import { BlurFade } from '@/components/ui/blur-fade'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Card } from '@/components/ui/card'
import { resolveMedia } from '@/lib/blocks/media'
import type { Testimonio, TestimonialRefBlock as TestimonialRefBlockType } from '@/payload-types'

function initials(nombre: string) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

/**
 * Render de 'testimonialRef': eyebrow + título + grid de `items` (docs
 * `testimonios` poblados a depth>=1). Espeja components/testimonios-section.tsx
 * (card con foto/iniciales, estrellas y quote).
 */
export function TestimonialRef({ block }: { block: TestimonialRefBlockType }) {
  const items = (block.items ?? []).filter(
    (item): item is Testimonio => typeof item === 'object' && item !== null,
  )

  // Hooks antes de cualquier early return (Rules of Hooks) — bug preexistente
  // encontrado al revisar errores del sitio: el early return de abajo corría
  // antes de useRef/useInView.
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  if (items.length === 0) return null

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing"
    >
      <div className="flex max-w-[700px] flex-col items-center gap-4">
        {block.eyebrow && <Eyebrow className="tracking-wider">{block.eyebrow}</Eyebrow>}
        {block.titulo && (
          <h2 className="text-center text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
            {block.titulo}
          </h2>
        )}
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {items.map((testimonial, index) => {
          const foto = resolveMedia(testimonial.foto)
          return (
            <BlurFade key={testimonial.id} delay={index * 0.08} isInView={isInView}>
            <Card padding="compact" hover="lift" className="group">
              <div className="flex items-center gap-4 mb-4">
                {foto ? (
                  <Image
                    src={foto.url}
                    alt={foto.alt || testimonial.nombre}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-sm font-semibold text-white">
                    {initials(testimonial.nombre)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{testimonial.nombre}</p>
                  {testimonial.rol && (
                    <p className="text-sm text-gray-400">{testimonial.rol}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </Card>
            </BlurFade>
          )
        })}
      </div>
    </section>
  )
}

export default TestimonialRef
