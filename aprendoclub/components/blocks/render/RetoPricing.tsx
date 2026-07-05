import { Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { RetoPricingBlock as RetoPricingBlockType } from '@/payload-types'

/**
 * Render de 'retoPricing': precio/precioNota/incluyeTexto/ctas[]/nota/
 * whatsapp. Espeja la sección "Pricing" de components/reto/reto-bottom.tsx
 * (Card con borde accent).
 */
export function RetoPricing({ block }: { block: RetoPricingBlockType }) {
  const ctas = block.ctas ?? []

  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto">
      <Card
        padding="default"
        hover="none"
        className="!border-[var(--accent)]/30 mx-auto flex max-w-md flex-col items-center gap-6 text-center"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-semibold text-white">{block.precio}</span>
          <span className="text-sm text-gray-400">{block.precioNota}</span>
        </div>
        <p className="text-sm leading-relaxed text-gray-400">{block.incluyeTexto}</p>
        {ctas.length > 0 && (
          <div className="flex w-full flex-col gap-3">
            {ctas.map((cta, i) => (
              <Button
                key={cta.id ?? i}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                variant={i === 0 ? 'primary' : 'ghost'}
                icon={i === 0}
                className="w-full"
              >
                {cta.label}
              </Button>
            ))}
          </div>
        )}
        <p className="flex items-center gap-2 text-xs text-gray-400">
          <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
          {block.nota}
        </p>
      </Card>
    </section>
  )
}

export default RetoPricing
