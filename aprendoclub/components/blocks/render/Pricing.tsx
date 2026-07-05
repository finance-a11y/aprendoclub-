import { Check, Trophy, MessageCircle } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { PricingBlock as PricingBlockType } from '@/payload-types'

/**
 * Render de 'pricing' (genérico): sectionHeader + planes[] (nombre/badge/
 * precio/precioTachado/precioNota/cuotasTexto/features[]/cta) + tarjeta de
 * asesoría (ctaAsesoria). Espeja components/pricing-section.tsx: la tarjeta
 * con `badge` recibe el tratamiento destacado (borde + badge "Más elegido"),
 * el resto la tarjeta neutra.
 */
export function Pricing({ block }: { block: PricingBlockType }) {
  const planes = block.planes ?? []

  return (
    <section className="bg-[var(--bg-primary)] container-padding section-spacing">
      {block.eyebrow && (
        <Eyebrow as="p" className="text-center tracking-[3px] mb-3">
          {block.eyebrow}
        </Eyebrow>
      )}
      <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white text-center mb-3">
        {block.titulo}
      </h2>
      {block.subtitulo && (
        <p className="text-gray-400 text-center text-[15px] mb-14">{block.subtitulo}</p>
      )}

      {planes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-5">
          {planes.map((plan, index) => {
            const destacado = Boolean(plan.badge)
            const features = plan.features ?? []
            return (
              <Card
                key={plan.id ?? index}
                padding="default"
                hover="none"
                className={
                  destacado
                    ? 'relative flex flex-col border-2 border-[var(--primary-light)] shadow-[0_0_40px_rgba(61,92,245,0.12)]'
                    : 'flex flex-col'
                }
              >
                {destacado && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-[var(--accent)] text-[var(--bg-primary)] text-[11px] font-semibold px-5 py-1.5 rounded-full whitespace-nowrap tracking-wide">
                    <Trophy className="h-3.5 w-3.5" />
                    {plan.badge}
                  </span>
                )}
                <p className="text-[11px] font-semibold tracking-[2.5px] text-[var(--primary-light)] uppercase mb-2">
                  {destacado ? 'Todo incluido' : 'Acceso completo'}
                </p>
                <p className="text-white text-2xl font-semibold">{plan.nombre}</p>
                <div className="flex items-baseline gap-1 mt-4 mb-1">
                  <span className="text-white text-6xl font-semibold leading-none">
                    {plan.precio}
                  </span>
                  {plan.precioTachado && (
                    <span className="text-gray-500 text-lg line-through ml-2">
                      {plan.precioTachado}
                    </span>
                  )}
                </div>
                {(plan.cuotasTexto || plan.precioNota) && (
                  <p className="text-gray-400 text-sm mb-5 font-medium">
                    {plan.cuotasTexto ?? plan.precioNota}
                  </p>
                )}
                <hr className="border-[var(--bg-tertiary)] mb-5" />
                {features.length > 0 && (
                  <ul className="space-y-2 flex-1 mb-7">
                    {features.map((f, i) => (
                      <li
                        key={f.id ?? i}
                        className="flex gap-2.5 text-[13.5px] text-[var(--text-muted)] font-medium leading-snug"
                      >
                        <Check className="h-4 w-4 text-[var(--accent)] mt-0.5 shrink-0" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                )}
                <Button
                  href={plan.cta.href}
                  variant={destacado ? 'primary' : 'secondary'}
                  size="lg"
                  icon={destacado}
                  className={
                    destacado
                      ? 'w-full !bg-[var(--primary-light)] hover:!bg-[var(--primary)]'
                      : 'w-full'
                  }
                >
                  {plan.cta.label}
                </Button>
              </Card>
            )
          })}
        </div>
      )}

      <Card
        padding="default"
        hover="none"
        className="max-w-3xl mx-auto border-2 !border-[var(--accent)] flex-col md:flex-row items-center gap-8 relative overflow-hidden flex"
      >
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/35 text-[var(--accent)] text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <MessageCircle className="h-3.5 w-3.5" />
            Hablemos
          </span>
          {block.ctaAsesoria.titulo && (
            <p className="text-white text-xl font-semibold mb-3 leading-snug">
              {block.ctaAsesoria.titulo}
            </p>
          )}
          {block.ctaAsesoria.texto && (
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {block.ctaAsesoria.texto}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <Button
            href={block.ctaAsesoria.cta.href}
            variant="primary"
            size="lg"
            className="!rounded-2xl !px-7 !py-5 whitespace-nowrap"
          >
            {block.ctaAsesoria.cta.label}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ fill: 'var(--bg-primary)' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.123 1.528 5.855L0 24l6.335-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.677-.497-5.215-1.367l-.374-.222-3.863.919.975-3.767-.243-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default Pricing
