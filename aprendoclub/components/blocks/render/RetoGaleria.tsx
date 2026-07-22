'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMediaList } from '@/lib/blocks/media'
import type { RetoGaleriaBlock as RetoGaleriaBlockType } from '@/payload-types'

/**
 * Render de 'retoGaleria': eyebrow/titulo/texto + galería masonry de
 * `imagenes` con lightbox. Espeja components/testimonios/reto-galeria.tsx
 * (cierre con Escape + bloqueo de scroll cuando el lightbox está abierto).
 */
export function RetoGaleria({ block }: { block: RetoGaleriaBlockType }) {
  const reduceMotion = useReducedMotion()
  const [activo, setActivo] = useState<number | null>(null)
  const imagenes = resolveMediaList(block.imagenes)

  const cerrar = useCallback(() => setActivo(null), [])

  useEffect(() => {
    if (activo === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activo, cerrar])

  const imagenActiva = activo !== null ? imagenes[activo] : null

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>
        <p className="text-lg text-gray-400">{block.texto}</p>
      </div>

      {imagenes.length > 0 && (
        <div className="w-full max-w-5xl columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {imagenes.map((imagen, index) => (
            <button
              type="button"
              onClick={() => setActivo(index)}
              key={imagen.url}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-[var(--surface-card)] transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={`Ampliar: ${imagen.alt}`}
            >
              <Image
                src={imagen.url}
                alt={imagen.alt}
                width={imagen.width || 800}
                height={imagen.height || 600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {imagenActiva && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            onClick={cerrar}
            role="dialog"
            aria-modal="true"
            aria-label="Testimonio ampliado"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              key={imagenActiva.url}
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.95, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
              className="max-h-[90vh] max-w-3xl"
            >
              <Image
                src={imagenActiva.url}
                alt={imagenActiva.alt}
                width={imagenActiva.width || 800}
                height={imagenActiva.height || 600}
                sizes="(max-width: 768px) 90vw, 768px"
                className="max-h-[90vh] w-auto h-auto rounded-lg border border-white/10 object-contain shadow-[var(--shadow-lg)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default RetoGaleria
