import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { PremiosBlock as PremiosBlockType } from '@/payload-types'

/**
 * Render de 'premios': mayor{titulo,imagen}, becas{titulo,imagen},
 * comoSeGana. Espeja la sección "Premios" de components/reto/reto-mid.tsx.
 */
export function Premios({ block }: { block: PremiosBlockType }) {
  const mayorImagen = resolveMedia(block.mayor?.imagen)
  const becasImagen = resolveMedia(block.becas?.imagen)

  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <Eyebrow>PREMIOS</Eyebrow>
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          No solo aprendes. También puedes ganar.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-card)]">
          {mayorImagen && (
            <div className="relative aspect-video w-full">
              <Image
                src={mayorImagen.url}
                alt={block.mayor.titulo}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className="p-6 text-lg font-semibold text-white">{block.mayor.titulo}</p>
        </div>
        <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-card)]">
          {becasImagen && (
            <div className="relative aspect-video w-full">
              <Image
                src={becasImagen.url}
                alt={block.becas.titulo}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className="p-6 text-lg font-semibold text-white">{block.becas.titulo}</p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-gray-400 measure-prose">
        {block.comoSeGana}
      </p>
    </section>
  )
}

export default Premios
