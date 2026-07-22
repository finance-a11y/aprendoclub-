import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { resolveMedia } from '@/lib/blocks/media'
import type { InstructorBlock as InstructorBlockType } from '@/payload-types'

/**
 * Render de 'instructor': eyebrow/nombre/rol + bio (bioCorta1/bioCorta2) +
 * stats + foto + teaser link. Espeja components/instructor-section.tsx
 * (foto con marco decorativo + bio + stats + link "Conoce más").
 */
export function Instructor({ block }: { block: InstructorBlockType }) {
  const foto = resolveMedia(block.foto)
  const stats = block.stats?.items ?? []

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl items-center">
        {/* Photo */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="absolute top-4 left-4 lg:left-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl border-2 border-[var(--primary)]/30" />

          {foto && (
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden">
              <Image
                src={foto.url}
                alt={foto.alt || block.nombre}
                fill
                sizes="(max-width: 768px) 280px, 350px"
                className="object-cover object-top"
              />
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div>
            <Eyebrow>{block.eyebrow}</Eyebrow>
          </div>

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

          <p className="text-lg text-[var(--primary)] font-semibold">{block.rol}</p>

          <p className="text-gray-400 leading-relaxed">{block.bioCorta1}</p>
          <p className="text-gray-400 leading-relaxed">{block.bioCorta2}</p>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              {stats.map((stat, index) => (
                <div key={stat.id ?? index} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-semibold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Teaser */}
          <div className="flex justify-center lg:justify-start pt-2">
            <Link
              href={block.teaser.href}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all"
            >
              {block.teaser.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Instructor
