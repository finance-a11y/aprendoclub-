'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { resolveMedia } from '@/lib/blocks/media'
import type { RetoHeroBlock as RetoHeroBlockType } from '@/payload-types'

/**
 * Render de 'retoHero': eyebrow/titulo/destacado/texto/bullets[]/precioTexto/
 * ctas[]/imagen. Espeja la sección Hero de components/reto/reto-top.tsx
 * (split-layout 2 columnas, framer-motion reveal).
 */
export function RetoHero({ block }: { block: RetoHeroBlockType }) {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
      }

  const bullets = block.bullets ?? []
  const ctas = block.ctas ?? []
  const imagen = resolveMedia(block.imagen)

  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <motion.div
        {...reveal}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
        className="flex flex-col gap-6 text-center lg:text-left"
      >
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
          {block.titulo}{' '}
          <span className="text-[var(--accent)]">{block.destacado}</span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-400">{block.texto}</p>
        {bullets.length > 0 && (
          <ul className="flex flex-col gap-3">
            {bullets.map((b, i) => (
              <li
                key={b.id ?? i}
                className="flex items-start gap-3 text-left text-sm text-gray-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {b.text}
              </li>
            ))}
          </ul>
        )}
        <p className="text-base font-semibold text-white">{block.precioTexto}</p>
        {ctas.length > 0 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-nowrap sm:justify-center lg:justify-start">
            {ctas[0] && (
              <Button
                href={ctas[0].href}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon
                className="whitespace-nowrap cta-shimmer"
              >
                {ctas[0].label}
              </Button>
            )}
            {ctas[1] && (
              <Button
                href={ctas[1].href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="whitespace-nowrap"
              >
                {ctas[1].label}
              </Button>
            )}
          </div>
        )}
      </motion.div>

      {imagen && (
        <motion.div
          {...reveal}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md"
        >
          <Image
            src={imagen.url}
            alt={imagen.alt || 'Arianna Lupi, mentora del Reto 7 días'}
            width={640}
            height={800}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </motion.div>
      )}
    </section>
  )
}

export default RetoHero
