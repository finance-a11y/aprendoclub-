import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { LucideIcon } from '@/lib/blocks/icons'
import type { HowItWorksBlock as HowItWorksBlockType } from '@/payload-types'

/**
 * Render de 'howItWorks': eyebrow/título + items[]{icon,titulo,descripcion}
 * (LucideIcon) + ctaLabel/ctaHref. Espeja components/diplomado/how-it-works.tsx
 * (grid de tarjetas 2/3 columnas + CTA final).
 */
export function HowItWorks({ block }: { block: HowItWorksBlockType }) {
  const items = block.items ?? []

  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        {block.eyebrow && <Eyebrow className="mb-4 block">{block.eyebrow}</Eyebrow>}

        <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
          {block.titulo}
        </h2>
        {block.subtitulo && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            {block.subtitulo}
          </p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            return (
              <div
                key={item.id ?? i}
                className={`rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 ${
                  i >= 3 ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <LucideIcon name={item.icon} className="h-6 w-6 text-[var(--primary-light)]" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{item.titulo}</h3>
                {item.descripcion && (
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.descripcion}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {block.ctaLabel && block.ctaHref && (
          <div className="mt-10 text-center">
            <Button
              href={block.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              {block.ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default HowItWorks
