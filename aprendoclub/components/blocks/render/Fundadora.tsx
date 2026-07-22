import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { FundadoraBlock as FundadoraBlockType } from '@/payload-types'

/**
 * Render de 'fundadora': eyebrow/nombre/rol + bio[] + foto.
 * Espeja components/quienes-somos/fundadora.tsx.
 */
export function Fundadora({ block }: { block: FundadoraBlockType }) {
  const foto = resolveMedia(block.foto)

  return (
    <section className="flex w-full flex-col items-center bg-[var(--bg-primary)] container-padding section-spacing">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl items-center">
        {/* Photo */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="absolute top-4 left-4 lg:left-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl border-2 border-[var(--primary)]/30" />

          {foto && (
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden">
              <Image
                src={foto.url}
                alt={`${block.nombre} - ${block.rol}`}
                fill
                sizes="(max-width: 768px) 280px, 350px"
                className="object-cover object-top"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <Eyebrow>{block.eyebrow}</Eyebrow>

          <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
            <a
              href="https://ariannalupi.com"
              target="_blank"
              rel="noopener"
              className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
            >
              {block.nombre}
            </a>
          </h2>

          <p className="text-lg text-[var(--primary)] font-medium">{block.rol}</p>

          <div className="flex flex-col gap-6 measure-prose">
            {block.bio.map((parrafo, index) => (
              <p key={parrafo.id ?? index} className="text-gray-400 leading-relaxed">
                {parrafo.texto}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Fundadora
