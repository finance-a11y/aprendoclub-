import { Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { TallerPricingBlock as TallerPricingBlockType } from '@/payload-types'

/**
 * Render de 'tallerPricing': monto + opciones[] + cta.
 * Espeja la sección "Precio + pago" de
 * app/(frontend)/(site)/programas/taller-seo-con-ia/page.tsx.
 */
export function TallerPricing({ block }: { block: TallerPricingBlockType }) {
  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
      <Card
        padding="default"
        hover="none"
        className="mx-auto flex max-w-md flex-col items-center gap-6 text-center"
      >
        <span className="text-5xl font-semibold text-white">{block.monto}</span>
        <ul className="flex w-full flex-col gap-3">
          {block.opciones.map((op, i) => (
            <li
              key={op.id ?? i}
              className="flex items-center gap-3 text-left text-sm text-gray-400"
            >
              <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />
              {op.texto}
            </li>
          ))}
        </ul>
        <Button
          href={block.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full"
          icon
        >
          {block.cta.label}
        </Button>
      </Card>
    </section>
  )
}

export default TallerPricing
