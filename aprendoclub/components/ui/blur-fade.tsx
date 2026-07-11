'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Entrance wrapper: opacity + y-offset + blur, gated by an externally
 * controlled `isInView` (via useInView at the section level) and by
 * useReducedMotion (AUD-04 convention, no reinvention).
 *
 * Client component — requires framer-motion runtime.
 */
export function BlurFade({
  children,
  delay = 0,
  isInView,
}: {
  children: ReactNode
  delay?: number
  isInView: boolean
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
