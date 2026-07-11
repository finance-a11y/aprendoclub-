'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animated border beam: a masked conic-gradient div spun via
 * `transform: rotate` (the ONLY animated property — transform/opacity-only
 * LOCKED rule, 23-CONTEXT.md). This deliberately replaces magicui's stock
 * CSS motion-path technique (animating a distance-along-path property),
 * which is forbidden here.
 *
 * `size` controls the angular spread (degrees) of the visible beam arc,
 * NOT a px comet width along a motion path. `duration` is seconds per
 * full revolution. Gated by useReducedMotion — returns null when reduced
 * motion is requested, since this is a JS `animate` loop, not a CSS
 * animation covered by the global prefers-reduced-motion media query.
 *
 * `isInView` (WR-02) pauses the rotation loop while the section is out of
 * viewport instead of letting `repeat: Infinity` run the compositor forever
 * in the background. Defaults to `true` so existing callers that don't pass
 * it keep the previous always-on behavior.
 *
 * Client component — requires framer-motion runtime.
 */
export function BorderBeam({
  size = 60,
  duration = 8,
  colorFrom = 'var(--accent)',
  colorTo = 'var(--primary)',
  isInView = true,
}: {
  size?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  isInView?: boolean
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]">
      <motion.div
        className="absolute inset-[-150%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} ${size / 2}deg, ${colorTo} ${size}deg, transparent ${size * 1.8}deg)`,
        }}
        animate={isInView ? { rotate: 360 } : undefined}
        transition={{ repeat: Infinity, ease: 'linear', duration }}
      />
    </div>
  )
}
