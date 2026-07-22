import { CheckCircle2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DiplomadoPricingBlock as DiplomadoPricingBlockType } from '@/payload-types'

/**
 * Render de 'diplomadoPricing': título/subtítulo + tarjeta única de plan
 * (planNombre/badgeText/precio/precioTachado/precioNota/descripcion/features[]
 * /ctaLabel/ctaHref) + garantiaTexto. Espeja components/diplomado/pricing.tsx
 * (tarjeta con borde degradado, badge "más popular" y caja de garantía).
 */
export function DiplomadoPricing({ block }: { block: DiplomadoPricingBlockType }) {
  const features = block.features ?? []

  return (
    <section id="pricing" className="scroll-mt-[72px] section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="text-center">
          <h2 className="text-balance text-[1.75rem] font-bold leading-[1.2] text-white md:text-4xl">
            {block.titulo}
          </h2>
          {block.subtitulo && (
            <p className="mt-4 text-lg text-gray-400">{block.subtitulo}</p>
          )}
        </div>

        {/* Single plan card */}
        <div className="mx-auto mt-12 max-w-md">
          <div className="relative rounded-2xl p-[1px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/40 via-[var(--primary)]/30 to-[var(--accent)]/20 blur-[2px]" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/40 via-[var(--primary)]/30 to-[var(--accent)]/20" />

            <div className="relative rounded-2xl bg-[var(--surface-card)] p-8">
              {block.badgeText && (
                <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-semibold text-black">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0l2.09 5.527L16 6.18l-4.364 3.89L12.944 16 8 12.616 3.056 16l1.308-5.93L0 6.18l5.91-.654z" />
                  </svg>
                  {block.badgeText}
                </div>
              )}

              <h3 className="text-2xl font-semibold text-white">{block.planNombre}</h3>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-semibold text-white">{block.precio}</span>
                {block.precioTachado && (
                  <span className="text-lg text-gray-400 line-through">
                    {block.precioTachado}
                  </span>
                )}
                {block.precioNota && (
                  <span className="text-lg text-gray-400">{block.precioNota}</span>
                )}
              </div>

              {block.descripcion && (
                <p className="mt-6 leading-relaxed text-gray-400">{block.descripcion}</p>
              )}

              <div className="my-6 h-px bg-white/10" />

              <ul className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <li key={feature.id ?? i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <span className="text-sm text-gray-400">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {block.ctaLabel && block.ctaHref && (
                <Button
                  href={block.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  icon
                  className="mt-8 w-full"
                >
                  {block.ctaLabel}
                </Button>
              )}
            </div>
          </div>
        </div>

        {block.garantiaTexto && (
          <div className="mx-auto mt-10 max-w-lg text-center">
            <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-card)] bg-[var(--surface-card)] px-6 py-4">
              <Shield className="h-5 w-5 text-[var(--accent)]" />
              <p className="text-sm leading-relaxed text-gray-400">{block.garantiaTexto}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DiplomadoPricing
