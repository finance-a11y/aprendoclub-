import { Eyebrow } from '@/components/ui/eyebrow'
import type { TallerHeroBlock as TallerHeroBlockType } from '@/payload-types'

/**
 * Render de 'tallerHero': eyebrow/titulo/subtitulo/duracion.
 * Espeja la sección hero de app/(frontend)/(site)/programas/taller-seo-con-ia/page.tsx.
 */
export function TallerHero({ block }: { block: TallerHeroBlockType }) {
  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto flex flex-col items-center gap-4 text-center pt-28">
      <Eyebrow className="tracking-[0.2em]">{block.eyebrow}</Eyebrow>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
        {block.titulo}
      </h1>
      <p className="max-w-2xl text-lg text-gray-400">{block.subtitulo}</p>
      <p className="mt-2 text-base font-medium text-white">{block.duracion}</p>
    </section>
  )
}

export default TallerHero
