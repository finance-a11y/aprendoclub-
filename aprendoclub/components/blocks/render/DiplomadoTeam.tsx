'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { BlurFade } from '@/components/ui/blur-fade'
import { resolveMedia } from '@/lib/blocks/media'
import type { DiplomadoTeamBlock as DiplomadoTeamBlockType, TeamMember } from '@/payload-types'

/**
 * Render de 'diplomadoTeam': teamIntro{eyebrow,titulo,subtitulo} + grid de
 * `equipo.items` (docs team-members poblados a depth>=1, mismo patrón que
 * TeamGridRef) + mentorSection{titulo,nombre,web,bio[],quote}. Espeja
 * components/diplomado/team.tsx (grid de tarjetas de coaches + tarjeta de
 * mentora principal con foto/bio/quote).
 */
export function DiplomadoTeam({ block }: { block: DiplomadoTeamBlockType }) {
  const members = (block.equipo?.items ?? []).filter(
    (item): item is TeamMember => typeof item === 'object' && item !== null,
  )
  const mentor = block.mentorSection
  const mentorMember = members.find((m) => m.nombre === mentor?.nombre) ?? members[0]
  const mentorFoto = resolveMedia(mentorMember?.foto)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        {block.teamIntro?.eyebrow && (
          <Eyebrow className="mb-4 block">{block.teamIntro.eyebrow}</Eyebrow>
        )}

        <h2 className="max-w-3xl text-balance text-[1.75rem] font-bold leading-[1.2] text-white md:text-4xl">
          {block.teamIntro?.titulo}
        </h2>

        {block.teamIntro?.subtitulo && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            {block.teamIntro.subtitulo}
          </p>
        )}

        {members.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {members.map((member, index) => {
              const foto = resolveMedia(member.foto)
              return (
                <BlurFade key={member.id} delay={index * 0.08} isInView={isInView}>
                <Card
                  padding="compact"
                  hover="none"
                  className="flex flex-col items-center text-center"
                >
                  {foto ? (
                    <Image
                      src={foto.url}
                      alt={foto.alt || member.nombre}
                      width={64}
                      height={64}
                      className="mb-4 h-16 w-16 shrink-0 rounded-full object-cover object-top"
                    />
                  ) : (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10 text-lg font-semibold text-[var(--primary-light)]">
                      {member.iniciales}
                    </div>
                  )}
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
                    <h3 className="font-semibold text-white">{member.nombre}</h3>
                  )}
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{member.rol}</p>
                </Card>
                </BlurFade>
              )
            })}
          </div>
        )}

        {/* Mentor section */}
        {mentor && (
          <Card padding="default" hover="none" className="mt-16 p-8 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {mentorFoto && (
                <Image
                  src={mentorFoto.url}
                  alt={mentor.nombre}
                  width={96}
                  height={96}
                  className="h-24 w-24 shrink-0 rounded-2xl object-cover object-top"
                />
              )}
              <div>
                <h3 className="mb-1 text-xl font-semibold text-white">{mentor.titulo}</h3>
                {mentor.web ? (
                  <a
                    href={mentor.web}
                    target="_blank"
                    rel="noopener"
                    className="mb-4 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
                  >
                    {mentor.nombre}
                  </a>
                ) : (
                  <p className="mb-4 text-sm font-medium text-white">{mentor.nombre}</p>
                )}
                <div className="flex flex-col gap-3 text-sm leading-relaxed text-gray-400">
                  {(mentor.bio ?? []).map((b, i) => (
                    <p key={b.id ?? i}>{b.texto}</p>
                  ))}
                  {mentor.quote && (
                    <p className="italic text-white">{mentor.quote}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}

export default DiplomadoTeam
