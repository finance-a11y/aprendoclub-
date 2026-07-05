import Image from 'next/image'
import { resolveMedia } from '@/lib/blocks/media'
import type { ClientesTrabajado, LogosRefBlock as LogosRefBlockType } from '@/payload-types'

/**
 * Render de 'logosRef': texto + banda de logos `items` (docs
 * `clientes-trabajados`). Espeja la banda "Profesionales de empresas como"
 * de components/testimonios-section.tsx.
 */
export function LogosRef({ block }: { block: LogosRefBlockType }) {
  const items = (block.items ?? []).filter(
    (item): item is ClientesTrabajado => typeof item === 'object' && item !== null,
  )
  if (items.length === 0) return null

  return (
    <section className="flex flex-col items-center gap-6 container-padding section-spacing">
      {block.texto && (
        <p className="text-sm text-gray-400 uppercase tracking-wider">{block.texto}</p>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {items.map((cliente) => {
          const logo = resolveMedia(cliente.logo)
          if (!logo) return null
          return (
            <Image
              key={cliente.id}
              src={logo.url}
              alt={logo.alt || cliente.nombre}
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          )
        })}
      </div>
    </section>
  )
}

export default LogosRef
