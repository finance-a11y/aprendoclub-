import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Card } from '@/components/ui/card'
import { resolveMedia } from '@/lib/blocks/media'
import type { TeamMember, TeamGridRefBlock as TeamGridRefBlockType } from '@/payload-types'

/**
 * Render de 'teamGridRef': eyebrow + título + subtítulo + grid de `items`
 * (docs `team-members` poblados a depth>=1). Espeja
 * components/quienes-somos/equipo.tsx (foto o iniciales, nombre con link
 * opcional a web, rol, bio).
 */
export function TeamGridRef({ block }: { block: TeamGridRefBlockType }) {
  const items = (block.items ?? []).filter(
    (item): item is TeamMember => typeof item === 'object' && item !== null,
  )
  if (items.length === 0) return null

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4 text-center">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        {block.titulo && (
          <h2 className="text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
            {block.titulo}
          </h2>
        )}
        {block.subtitulo && (
          <p className="text-gray-400">{block.subtitulo}</p>
        )}
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {items.map((member) => {
          const foto = resolveMedia(member.foto)
          return (
            <Card key={member.id} padding="compact" hover="lift" className="group">
              <div className="flex items-center gap-4 mb-4">
                {foto ? (
                  <Image
                    src={foto.url}
                    alt={foto.alt || member.nombre}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-lg font-semibold text-white">
                    {member.iniciales}
                  </div>
                )}
                <div>
                  {member.web ? (
                    <a
                      href={member.web}
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
                    >
                      {member.nombre}
                    </a>
                  ) : (
                    <p className="font-semibold text-white">{member.nombre}</p>
                  )}
                  <p className="text-sm text-[var(--primary)]">{member.rol}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default TeamGridRef
