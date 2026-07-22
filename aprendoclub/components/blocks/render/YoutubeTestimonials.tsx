'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { YoutubeTestimonialsBlock as YoutubeTestimonialsBlockType } from '@/payload-types'

/**
 * Extrae el ID de 11 caracteres de una URL de YouTube (watch?v=, youtu.be/,
 * /embed/, /shorts/) o devuelve la cadena si ya es un ID pelado.
 */
function youtubeId(raw: string): string | null {
  const value = raw.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value
  const patterns = [
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const re of patterns) {
    const m = value.match(re)
    if (m?.[1]) return m[1]
  }
  return null
}

type VideoItem = NonNullable<YoutubeTestimonialsBlockType['videos']>[number]

/**
 * Facade click-to-play de un testimonio: muestra el thumbnail de YouTube + un
 * botón play accesible; solo al hacer click monta el <iframe> y reproduce.
 * Ningún script/iframe de YouTube en la carga inicial (VID-03).
 */
function VideoCard({ item }: { item: VideoItem }) {
  const [playing, setPlaying] = useState(false)
  const id = youtubeId(item.youtube)
  if (!id) return null

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={`Testimonio de ${item.nombre}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir el testimonio en video de ${item.nombre}`}
            className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {/* Thumbnail estático (sin optimizador): no toca red de YouTube más
                allá de la imagen; se carga lazy fuera del viewport. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={`Testimonio de ${item.nombre}`}
              loading="lazy"
              width={480}
              height={360}
              className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/20 motion-safe:transition-colors motion-safe:duration-300 group-hover:bg-black/10" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-black shadow-lg motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <figcaption className="text-center font-semibold text-white">{item.nombre}</figcaption>
    </figure>
  )
}

/**
 * Render de 'youtubeTestimonials': eyebrow + título + grid responsive de
 * facades de video (VID-01..04). Coherente con el design system (dark, accent,
 * Montserrat via layout).
 */
export function YoutubeTestimonials({ block }: { block: YoutubeTestimonialsBlockType }) {
  const videos = (block.videos ?? []).filter(
    (v): v is VideoItem => typeof v === 'object' && v !== null,
  )
  if (videos.length === 0) return null

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing">
      {(block.eyebrow || block.titulo) && (
        <div className="flex max-w-[700px] flex-col items-center gap-4">
          {block.eyebrow && <Eyebrow className="tracking-wider">{block.eyebrow}</Eyebrow>}
          {block.titulo && (
            <h2 className="text-center text-[1.75rem] md:text-4xl font-bold leading-[1.2] text-white">
              {block.titulo}
            </h2>
          )}
        </div>
      )}

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {videos.map((item) => (
          <VideoCard key={item.id ?? item.youtube} item={item} />
        ))}
      </div>
    </section>
  )
}

export default YoutubeTestimonials
