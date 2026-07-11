'use client'

import type { ReactNode } from 'react'
import { useEffect, useLayoutEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// useLayoutEffect warns on the server (no-op there). Fall back to useEffect
// during SSR so the mount flag below never triggers a React warning, while
// still resolving synchronously before paint on the client (WR-01 fix).
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Entrance wrapper: opacity + y-offset + blur, gated by an externally
 * controlled `isInView` (via useInView at the section level) and by
 * useReducedMotion (AUD-04 convention, no reinvention).
 *
 * Client component — requires framer-motion runtime.
 *
 * SSR-safe by design (WR-01): the server (and the very first client render,
 * before hydration) never emits the `opacity:0; filter:blur(6px)` inline
 * style. `initial` only switches to the hidden state once `mounted` flips to
 * true, which happens in a layout effect — i.e. synchronously after
 * hydration but before the browser paints. If JS never loads/executes, the
 * content stays at its natural (visible) styles forever instead of being
 * permanently stuck at `opacity:0`.
 */
export function BlurFade({
  children,
  delay = 0,
  isInView,
  className,
}: {
  children: ReactNode
  delay?: number
  isInView: boolean
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className={className}
      initial={mounted && !reduceMotion ? { opacity: 0, y: 12, filter: 'blur(6px)' } : false}
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
