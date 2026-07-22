import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CtaBannerBlock as CtaBannerBlockType } from '@/payload-types'

/**
 * Render de 'ctaBanner': título + texto + bullets[] + botón.
 * Espeja components/cta-section.tsx (fondo con blobs + CTA centrado).
 *
 * Tolera el shape legado del ctaFinal del reto (botonLabel/botonHref) por si
 * algún dato upstream trae esas keys sueltas en vez del group `boton`.
 */
export function CtaBanner({ block }: { block: CtaBannerBlockType }) {
  const legacy = block as unknown as { botonLabel?: string; botonHref?: string }
  const label = block.boton?.label ?? legacy.botonLabel ?? ''
  const href = block.boton?.href ?? legacy.botonHref ?? '#'

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] container-padding section-spacing">
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[var(--primary)]/20 blur-3xl"
        style={{ animation: 'float-slow 20s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[var(--primary)]/10 blur-3xl"
        style={{ animation: 'float-slow 20s ease-in-out infinite reverse' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl text-center">
        <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
          {block.titulo}
        </h2>

        {block.texto && (
          <p className="text-gray-300 leading-relaxed">{block.texto}</p>
        )}

        {block.bullets && block.bullets.length > 0 && (
          <ul className="flex flex-col gap-2 text-left">
            {block.bullets.map((bullet, i) => (
              <li
                key={bullet.id ?? i}
                className="flex items-center gap-2 text-gray-300"
              >
                <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                {bullet.text}
              </li>
            ))}
          </ul>
        )}

        {label && (
          <Button href={href} variant="primary" size="lg">
            {label}
          </Button>
        )}
      </div>
    </section>
  )
}

export default CtaBanner
