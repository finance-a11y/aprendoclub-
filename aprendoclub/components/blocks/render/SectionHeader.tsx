import { Eyebrow } from '@/components/ui/eyebrow'
import type { SectionHeaderBlock as SectionHeaderBlockType } from '@/payload-types'

/**
 * Render de 'sectionHeader': eyebrow + título + subtítulo centrado.
 * Espeja la cabecera reutilizada por quienes-somos/testimonios/programas
 * (ver components/quienes-somos/equipo.tsx, components/faq-section.tsx).
 */
export function SectionHeader({ block }: { block: SectionHeaderBlockType }) {
  return (
    <section className="flex w-full flex-col items-center gap-4 text-center container-padding section-spacing">
      {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
      <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white max-w-[700px]">
        {block.titulo}
      </h2>
      {block.subtitulo && (
        <p className="text-gray-400 max-w-[700px]">{block.subtitulo}</p>
      )}
    </section>
  )
}

export default SectionHeader
