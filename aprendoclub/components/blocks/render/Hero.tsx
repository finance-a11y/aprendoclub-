import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { HeroBlock as HeroBlockType } from '@/payload-types'

/**
 * Render de 'hero' (genérico): badge + eyebrow + título compuesto
 * (tituloPre/Accent/Post) + subtítulo + texto + bullets + imagen +
 * ctaPrimario/ctaSecundario + microcopy.
 * Espeja components/diplomado/hero.tsx (variante split-title centrada con
 * badge, CTAs y microcopy debajo). Consumido por el hero del diplomado.
 */
export function Hero({ block }: { block: HeroBlockType }) {
  const imagen = resolveMedia(block.imagen)

  return (
    <section className="relative overflow-hidden section-spacing">
      <div className="relative mx-auto max-w-6xl container-padding text-center">
        {block.badgeText && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--surface-card)] px-4 py-1.5 text-sm text-gray-400">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
            {block.badgeText}
          </div>
        )}

        {block.eyebrow && (
          <Eyebrow as="p" className="mb-3 justify-center">
            {block.eyebrow}
          </Eyebrow>
        )}

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          {block.tituloPre}
          {block.tituloAccent && (
            <span className="text-[var(--accent)]"> {block.tituloAccent}</span>
          )}
          {block.tituloPost && <> {block.tituloPost}</>}
        </h1>

        {block.subtitulo && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-gray-400 md:text-xl">
            {block.subtitulo}
          </p>
        )}

        {block.texto && (
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-base leading-relaxed text-gray-400">
            {block.texto}
          </p>
        )}

        {block.bullets && block.bullets.length > 0 && (
          <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left">
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

        {imagen && (
          <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl">
            <Image
              src={imagen.url}
              alt={imagen.alt}
              width={imagen.width || 1200}
              height={imagen.height || 675}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-nowrap">
          <Button
            href={block.ctaPrimario.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            icon
            className="whitespace-nowrap cta-shimmer"
          >
            {block.ctaPrimario.label}
          </Button>
          <Button
            href={block.ctaSecundario.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="hover:bg-white/10 whitespace-nowrap"
          >
            {block.ctaSecundario.label}
          </Button>
        </div>

        {block.microcopy && (
          <p className="mt-4 text-sm text-gray-400">{block.microcopy}</p>
        )}
      </div>
    </section>
  )
}

export default Hero
