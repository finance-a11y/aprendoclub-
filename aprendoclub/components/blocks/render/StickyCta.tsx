'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { StickyCtaBlock as StickyCtaBlockType } from '@/payload-types'

/**
 * Render de 'stickyCta': botón sticky mobile que aparece cuando el hero deja
 * de estar en viewport. Espeja components/sticky-cta-mobile.tsx
 * (IntersectionObserver sobre la primera <section>, AnimatePresence).
 */
export function StickyCta({ block }: { block: StickyCtaBlockType }) {
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const heroSection = document.querySelector('section')
    if (!heroSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={reduceMotion ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-[var(--bg-primary)]/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 safe-area-bottom">
            <Button
              href={block.boton.href}
              variant="primary"
              size="lg"
              className="w-full active:scale-[0.98]"
            >
              {block.boton.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyCta
